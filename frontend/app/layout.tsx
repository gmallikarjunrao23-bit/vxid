import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Shell from "@/components/layout/Shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VXID — Digital Empires",
  description:
    "Premium websites, products, and experiences for brands that refuse to be ordinary.",
  keywords: [
    "digital agency",
    "web development",
    "UI/UX design",
    "brand identity",
    "mobile apps",
  ],
  openGraph: {
    title: "VXID — Digital Empires",
    description:
      "Premium websites, products, and experiences for brands that refuse to be ordinary.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* Clash Display from Fontshare */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void font-sans text-white antialiased">
        <SmoothScroll>
          <div className="vxid-grain" aria-hidden="true" />
          <CustomCursor />
          <Shell>{children}</Shell>
        </SmoothScroll>
      </body>
    </html>
  );
}
