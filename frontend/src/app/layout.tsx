import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { API_URL } from "@/utils/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MiniTimer",
  description: "A simple and efficient timer application for quick timing tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}
      >
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}