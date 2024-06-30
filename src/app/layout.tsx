import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import Nav from "./nav";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAS Admin",
  description: "Administrator app for Dunedin Astronomical Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen"}>
        <NextUIProvider>
          <Nav />
          <main className="flex flex-col items-center justify-between px-24 py-12">
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
