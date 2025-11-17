import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl, schemaData, metadata as siteMetadata } from "@/lib/seo";
import { GoogleTagManager } from "@next/third-parties/google";
import { BackgroundGrid } from "@/components/background-grid";
import { FloatingTechIcons } from "@/components/floating-tech-icons";
import { FloatingDockDemo } from "@/components/ui/dock";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { VisitorCounterWrapper } from "@/components/visitor-counter-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="true" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="description"
          content="Full Stack JavaScript developer with 10+ years of experience in web development and cloud architecture."
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-[100vh] overflow-y-none min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black relative">
            <header className="absolute top-2 right-2 z-10">
              <ModeToggle />
            </header>
            <FloatingTechIcons />
            <main className=" items-center justify-center w-full h-full">
              <BackgroundGrid>{children}</BackgroundGrid>
            </main>
            <footer className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10">
              <FloatingDockDemo />
            </footer>
            <VisitorCounterWrapper />
          </div>
          <Analytics />
          <SpeedInsights />
          <GoogleTagManager gtmId="G-HQ721RPGYS" />
        </ThemeProvider>
      </body>
    </html>
  );
}
