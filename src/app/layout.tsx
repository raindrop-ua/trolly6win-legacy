import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";

const dniproCityRegular = localFont({
  src: "./fonts/dniprocity-regular-webfont.woff",
  variable: "--font-dniproCity-regular",
  weight: "400",
});

const dniproCityBold = localFont({
  src: "./fonts/dniprocity-bold-webfont.woff",
  variable: "--font-dniproCity-bold",
  weight: "800",
});

export const metadata: Metadata = {
  title: "TrollySix",
  description: "Generated with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dniproCityRegular.variable} ${dniproCityBold.variable}`}>
        {children}
      </body>
    </html>
  );
}
