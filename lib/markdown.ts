import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { promises as fs } from "fs";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import { visit } from "unist-util-visit";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pre from "@/components/pre";
import Note from "@/components/note";
import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CodePreview from "@/components/code-preview";
import * as LucideIcons from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const icons = {
  Eye: LucideIcons.Eye,
  EyeOff: LucideIcons.EyeOff,
  Search: LucideIcons.Search,
  Mail: LucideIcons.Mail,
  Lock: LucideIcons.Lock,
  User: LucideIcons.User,
  ArrowRight: LucideIcons.ArrowRight,
  Download: LucideIcons.Download,
  ChevronRight: LucideIcons.ChevronRight,
  Loader2: LucideIcons.Loader2,
  Heart: LucideIcons.Heart,
  ChevronLeft: LucideIcons.ChevronLeft,
  Settings: LucideIcons.Settings,
  Plus: LucideIcons.Plus,
  Edit: LucideIcons.Edit,
  Trash2: LucideIcons.Trash2,
};

const components = {
  ...icons,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  pre: Pre,
  Note,
  Stepper,
  StepperItem,
  Input,
  Button,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  CodePreview,
};

async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preProcess,
          rehypeCodeTitles,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postProcess,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  });
}

type BaseMdxFrontmatter = {
  title: string;
  description: string;
};

export async function getDocsForSlug(slug: string) {
  try {
    const contentPath = getDocsContentPath(slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await parseMdx<BaseMdxFrontmatter>(rawMdx);
  } catch (err) {
    console.log(err);
  }
}

export async function getDocsTocs(slug: string) {
  const contentPath = getDocsContentPath(slug);
  const rawMdx = await fs.readFile(contentPath, "utf-8");
  // captures between ## - #### can modify accordingly
  const headingsRegex = /^(#{2,4})\s(.+)$/gm;
  let match;
  const extractedHeadings = [];
  while ((match = headingsRegex.exec(rawMdx)) !== null) {
    const headingLevel = match[1].length;
    const headingText = match[2].trim();
    const slug = sluggify(headingText);
    extractedHeadings.push({
      level: headingLevel,
      text: headingText,
      href: `#${slug}`,
    });
  }
  return extractedHeadings;
}

function sluggify(text: string) {
  const slug = text.toLowerCase().replace(/\s+/g, "-");
  return slug.replace(/[^a-z0-9-]/g, "");
}

function getDocsContentPath(slug: string) {
  return path.join(process.cwd(), "/contents/docs/", `${slug}/index.mdx`);
}

// for copying the code
const preProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node.children;
      if (codeEl.tagName !== "code") return;
      node.raw = codeEl.children?.[0].value;
    }
  });
};

const postProcess = () => (tree: any) => {
  visit(tree, "element", (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      node.properties["raw"] = node.raw;
      // console.log(node);
    }
  });
};

export type Author = {
  avatar?: string;
  handle: string;
  username: string;
  handleUrl: string;
};

export type BlogMdxFrontmatter = BaseMdxFrontmatter & {
  date: string;
  authors: Author[];
};

export async function getAllBlogStaticPaths() {
  try {
    const blogFolder = path.join(process.cwd(), "/contents/blogs/");
    const res = await fs.readdir(blogFolder);
    return res.map((file) => file.split(".")[0]);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllBlogs() {
  const blogFolder = path.join(process.cwd(), "/contents/blogs/");
  const files = await fs.readdir(blogFolder);
  return await Promise.all(
    files.map(async (file) => {
      const filepath = path.join(process.cwd(), `/contents/blogs/${file}`);
      const rawMdx = await fs.readFile(filepath, "utf-8");
      return {
        ...(await parseMdx<BlogMdxFrontmatter>(rawMdx)),
        slug: file.split(".")[0],
      };
    })
  );
}

export async function getBlogForSlug(slug: string) {
  const blogs = await getAllBlogs();
  return blogs.find((it) => it.slug == slug);
}
