import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Integrity Wall and Ceiling of Toledo",
  description: "Integrity Wall and Ceiling of Toledo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <Head>
       <link rel="svg" href="/icon.svg" sizes="any" />
      </Head>
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
