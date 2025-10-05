import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Smarter Dog - Award-Winning Dog Grooming | Ashton-under-Lyne",
  description: "40+ years pampering pups in Ashton-under-Lyne. All breeds welcome. Professional dog grooming with full groom, de-shedding & maintenance packages. Book online or call 07507 731487.",
  keywords: ["dog grooming Ashton-under-Lyne", "dog groomer Manchester", "pet grooming", "full groom", "de-shedding", "smarter dog"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
