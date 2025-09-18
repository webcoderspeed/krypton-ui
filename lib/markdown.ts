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
import { Button, buttonVariants } from "@/components/ui/button";
import CodePreview from "@/components/code-preview";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LucideIcon from "@/components/lucide-icon";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  ButtonDefault,
  ButtonVariants,
  ButtonSizes,
  ButtonWithIcon,
  ButtonLoading,
  ButtonAsChild,
  ButtonDestructive,
  ButtonOutline,
  ButtonSecondary,
  ButtonGhost,
  ButtonLink,
} from "@/components/playground/button";
import {
  AccordionDefault,
  AccordionMultiple,
  AccordionControlled,
} from "@/components/playground/accordion";
import {
  AlertDemo,
  AlertDestructive,
  AlertWithIcon,
  AlertWithoutIcon,
} from "@/components/playground/alert";
import {
  CalendarDefault,
  CalendarRange,
  CalendarMultiple,
  CalendarDisabled,
} from "@/components/playground/calendar";
import {
  CardDefault,
  CardWithForm,
  CardSimple,
  CardGrid,
} from "@/components/playground/card";
import {
  CarouselDefault,
  CarouselMultiple,
  CarouselVertical,
  CarouselApi,
} from "@/components/playground/carousel";
import {
  CheckboxDefault,
  CheckboxDisabled,
  CheckboxWithText,
  CheckboxForm,
} from "@/components/playground/checkbox";
import {
  InputDefault,
  InputDisabled,
  InputWithIcons,
  InputTypes,
  InputForm,
} from "@/components/playground/input";
import {
  BadgeDefault,
  BadgeSecondary,
  BadgeDestructive,
  BadgeOutline,
  BadgeVariants,
  BadgeSizes,
  BadgeWithIcon,
  BadgeWithIcons,
  StatusIndicators,
} from "@/components/playground/badge";
import {
  BreadcrumbDefault,
  BreadcrumbCustomSeparator,
  BreadcrumbWithEllipsis,
 BreadcrumbWithDropdown,
  BreadcrumbWithIcons,
} from "@/components/playground/breadcrumb";
import {
  AlertDialogDefault,
  AlertDialogDestructive,
  AlertDialogCustom,
  AlertDialogControlled,
} from "@/components/playground/alert-dialog";
import {
  AspectRatioDefault,
  AspectRatioVariants,
  AspectRatioVideo,
  AspectRatioDifferent,
  AspectRatioCards,
  AspectRatioResponsive,
  AspectRatioCustom,
} from "@/components/playground/aspect-ratio";
import {
  AvatarDefault,
  AvatarSizes,
  AvatarFallbackDemo,
  AvatarGroup,
  AvatarWithStatusDemo,
  AvatarCustomShapes,
  UserProfileCard,
} from "@/components/playground/avatar";
import {
  CollapsibleDefault,
  CollapsibleControlled,
  CollapsibleNested,
  CollapsibleFAQ,
  CollapsibleShoppingCart,
  CollapsibleNotifications,
  CollapsibleSidebar,
  CollapsibleProductDetails,
  CollapsibleDashboardStats,
  CollapsibleChat,
} from "@/components/playground/collapsible";
import {
  CommandBasic,
  CommandDialogExample,
  CommandMenu,
  CommandSearchable,
  CommandActions,
  CommandLoading,
  CommandKeyboard,
  CommandStyled,
  CommandNested,
  CommandAdvanced,
} from "@/components/playground/command";
import {
  ContextMenuBasic,
  ContextMenuCheckbox,
  ContextMenuSubmenu,
  ContextMenuFile,
  ContextMenuTable,
} from "@/components/playground/context-menu";
import {
  BasicDialog,
  FormDialog,
  ConfirmationDialog,
  CustomSizeDialog,
  UserProfileDialog,
  ProductDetailsDialog,
  SettingsDialog,
  ImageGalleryDialog,
  TaskCreationDialog,
  PaymentDialog,
} from "@/components/playground/dialog";
import {
  TabsDefault,
  TabsWithForm,
  TabsVertical,
  TabsWithIcons,
  TabsControlled,
  TabsWithBadges,
  TabsDashboard,
  TabsLoading,
  TabsDisabled,
  TabsCustomStyling,
} from "@/components/playground/tabs";
import {
  SelectDefault,
  SelectDisabled,
  SelectGrouped,
  SelectControlled,
  SelectCountrySelector,
  SelectUserRole,
  SelectThemeSelector,
  SelectProductFilter,
  SelectTimezone,
  SelectLanguage,
  SelectWithForm,
    SelectWithGroups,
    SettingsPanel,
    CustomStyledSelect,
  MultipleSelectsForm,
  SearchableSelect,
} from "@/components/playground/select";

const components = {
  LucideIcon,
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Command,
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput,
  CommandSeparator,
  CommandShortcut,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  ButtonDefault,
  ButtonVariants,
  ButtonSizes,
  ButtonWithIcon,
  ButtonLoading,
  ButtonAsChild,
  ButtonDestructive,
  ButtonOutline,
  ButtonSecondary,
  ButtonGhost,
  ButtonLink,
  AccordionDefault,
  AccordionMultiple,
  AccordionControlled,
  AlertDemo,
  AlertDestructive,
  AlertWithIcon,
  AlertWithoutIcon,
  CalendarDefault,
  CalendarRange,
  CalendarMultiple,
  CalendarDisabled,
  CardDefault,
  CardWithForm,
  CardSimple,
  CardGrid,
  CarouselDefault,
  CarouselMultiple,
  CarouselVertical,
  CarouselApi,
  CheckboxDefault,
  CheckboxDisabled,
  CheckboxWithText,
  CheckboxForm,
  InputDefault,
  InputDisabled,
  InputWithIcons,
  InputTypes,
  InputForm,
  BadgeDefault,
  BadgeSecondary,
  BadgeDestructive,
  BadgeOutline,
  BadgeVariants,
  BadgeSizes,
  BadgeWithIcon,
  BadgeWithIcons,
  StatusIndicators,
  BreadcrumbDefault,
  BreadcrumbCustomSeparator,
  BreadcrumbWithEllipsis,
  BreadcrumbWithDropdown,
  AlertDialogDefault,
  AlertDialogDestructive,
  AlertDialogCustom,
  AlertDialogControlled,
  AspectRatioDefault,
  AspectRatioVariants,
  AspectRatioVideo,
  AspectRatioDifferent,
  AspectRatioCards,
  AspectRatioResponsive,
  AspectRatioCustom,
  AvatarDefault,
  AvatarSizes,
  AvatarGroup,
  AvatarFallbackDemo,
  AvatarWithStatusDemo,
  AvatarCustomShapes,
  UserProfileCard,
  BreadcrumbWithIcons,
  CollapsibleDefault,
  CollapsibleControlled,
  CollapsibleNested,
  CollapsibleFAQ,
  CollapsibleShoppingCart,
  CollapsibleNotifications,
  CollapsibleSidebar,
  CollapsibleProductDetails,
  CollapsibleDashboardStats,
  CollapsibleChat,
  CommandBasic,
  CommandDialogExample,
  CommandMenu,
  CommandSearchable,
  CommandActions,
  CommandLoading,
  CommandKeyboard,
  CommandStyled,
  CommandNested,
  CommandAdvanced,
  ContextMenuBasic,
  ContextMenuCheckbox,
  ContextMenuSubmenu,
  ContextMenuFile,
  ContextMenuTable,
  BasicDialog,
  FormDialog,
  ConfirmationDialog,
  CustomSizeDialog,
  UserProfileDialog,
  ProductDetailsDialog,
  SettingsDialog,
  ImageGalleryDialog,
  TaskCreationDialog,
  PaymentDialog,
  TabsDefault,
  TabsWithForm,
  TabsVertical,
  TabsWithIcons,
  TabsControlled,
  TabsWithBadges,
  TabsDashboard,
  TabsLoading,
  TabsDisabled,
  TabsCustomStyling,
  SelectDefault,
  SelectDisabled,
  SelectGrouped,
  SelectControlled,
  SelectCountrySelector,
  SelectUserRole,
  SelectThemeSelector,
  SelectProductFilter,
  SelectTimezone,
  SelectLanguage,
  SelectWithForm,
 SelectWithGroups,
  SettingsPanel,
  CustomStyledSelect,
  MultipleSelectsForm,
  SearchableSelect,
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
