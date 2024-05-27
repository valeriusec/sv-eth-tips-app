import type { Metadata } from "next";
import "@/utils/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/interface/NavBar";
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/interface/Footer";

export const metadata: Metadata = {
  title: "SV | Tips",
  description: "Tips App",
  icons: [
    {
      rel: "icon",
      media: '(prefers-color-scheme: light)',
      type: "image/png",
      url: "/logo/png/favicon-dark.png"
    },
    {
      rel: "icon",
      media: '(prefers-color-scheme: dark)',
      type: "image/png",
      url: "/logo/png/favicon-light.png"
    },
    {
      rel: "apple-touch-icon",
      media: '(prefers-color-scheme: light)',
      type: "image/png",
      url: "/logo/png/favicon-dark.png"
    },
    {
      rel: "apple-touch-icon",
      media: '(prefers-color-scheme: dark)',
      type: "image/png",
      url: "/logo/png/favicon-light.png"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className='w-full h-14' />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
