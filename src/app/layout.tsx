import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {NextUIProvider} from "@nextui-org/react";
import "./globals.css";
import Nav from "./nav";
import React from "react";
import {SessionProvider} from "next-auth/react";
import {Providers} from "@/app/providers";

const inter = Inter({subsets: ["latin"]});

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
      <Providers>
        <Nav/>
        <main className="flex flex-col items-center justify-between px-24 py-12">
          {children}
        </main>
      </Providers>
    </NextUIProvider>
    </body>
    </html>
  );
}
