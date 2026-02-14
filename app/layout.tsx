import type { Metadata } from "next";

import "@/app/styles/global.css";

import { cn } from "@/lib/cn";
import { fontVariables } from "@/lib/fonts";

import Provider from "@/components/common/Provider";

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokedex is a pokemon encyclopedia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(fontVariables, "antialiased text-sm bg-gray-100")}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
