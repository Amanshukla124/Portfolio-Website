import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollReset from "@/components/shared/ScrollReset";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aman Shukla — Developer & Designer",
  description:
    "Dual-identity interactive portfolio of Aman Shukla. Explore the developer side — full-stack engineering and scalable systems — or the designer side — visual storytelling and creative UI/UX.",
  keywords: ["Aman Shukla", "portfolio", "developer", "designer", "full-stack", "UI/UX"],
  authors: [{ name: "Aman Shukla" }],
  openGraph: {
    title: "Aman Shukla — Developer & Designer",
    description: "A dual-identity portfolio that transforms between developer and designer personas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
