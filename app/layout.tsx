import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Footer } from "@/components/footer";
import "./globals.css";
import VersionContextWrapper from "@/components/version-context-wrapper";

export const metadata: Metadata = {
  title: "Nova-UI - Next-Generation Design System",
  metadataBase: new URL("https://nova-ui.vercel.app/"),
  description:
    "A next-generation design system for Next.js with comprehensive theming, accessibility, and type safety. Built with performance and developer experience in mind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <VersionContextWrapper>
            <Navbar />
            <main className="sm:container mx-auto w-[88vw] h-auto">
              {children}
            </main>
            <Footer />
          </VersionContextWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
