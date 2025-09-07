"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Copy, Check, Code2, Eye, Sparkles } from "lucide-react";

interface CodePreviewProps {
  code: string;
  language?: string;
  className?: string;
  title?: string;
  preview?: boolean | React.ReactNode;
}

export function CodePreview({
  code,
  language = "javascript",
  className,
  title,
  preview,
}: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<"code" | "preview">(
    preview ? "preview" : "code"
  );
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const renderPreview = () => {
    if (preview && typeof preview !== "boolean") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {preview}
        </motion.div>
      );
    }

    if (language === "html") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full bg-background rounded-lg border"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      );
    }

    if (language === "css") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <style dangerouslySetInnerHTML={{ __html: code }} />
          <div className="flex items-center justify-center h-full bg-muted rounded-lg border">
            <div className="text-center p-8">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-sm font-medium text-foreground">
                CSS Styles Applied
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Add HTML content to see the effects
              </p>
            </div>
          </div>
        </motion.div>
      );
    }

    if (language === "tsx" || language === "jsx") {
      try {
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center p-8 bg-muted rounded-lg border"
          >
            <div className="text-center">
              <Code2 className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-sm font-medium text-foreground">
                React Component Preview
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Interactive preview available in development
              </p>
            </div>
          </motion.div>
        );
      } catch (error) {
        console.error("Preview error:", error);
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center h-full bg-muted rounded-lg border"
      >
        <div className="text-center p-8">
          <Code2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            Preview not available for {language}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Only HTML and CSS can be previewed safely
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <div className="overflow-hidden bg-card/50 backdrop-blur-sm border shadow-xl rounded-lg">
        {/* Header with title and language badge */}
        {title && (
          <div className="px-6 py-3 bg-muted border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <span className="px-2 py-1 text-xs font-mono bg-accent text-accent-foreground rounded-md">
                {language}
              </span>
            </div>
          </div>
        )}

        {preview && (
          <div className="flex items-center justify-between bg-muted/80 border-b">
            <div className="flex">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("code")}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200",
                  activeTab === "code"
                    ? "text-primary bg-background border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Code2 className="w-4 h-4" />
                Code
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200",
                  activeTab === "preview"
                    ? "text-primary bg-background border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Eye className="w-4 h-4" />
                Preview
              </motion.button>
            </div>

            {/* Copy button and language badge */}
            <div className="flex items-center gap-3 px-4">
              {!title && (
                <span className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded">
                  {language}
                </span>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-md transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Copied!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {preview && activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              {renderPreview()}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: preview ? -20 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: preview ? 20 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <SyntaxHighlighter
                language={language}
                style={oneDark}
                wrapLines={true}
                customStyle={{
                  margin: 0,
                  padding: "1.5rem",
                  background: "transparent",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                }}
                lineNumberStyle={{
                  minWidth: "3em",
                  paddingRight: "1em",
                  userSelect: "none",
                }}
              >
                {code}
              </SyntaxHighlighter>

              {!preview && !title && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded">
                    {language}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-md transition-all duration-200"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          Copied!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default CodePreview;
