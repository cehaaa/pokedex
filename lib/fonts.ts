import { cn } from "@/lib";

import { Saira, Noto_Sans_Mono } from "next/font/google";

export const saira = Saira({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	variable: "--font-saira",
});

export const notoSansMono = Noto_Sans_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	variable: "--font-noto-sans-mono",
});

export const fontVariables = cn(saira.variable, notoSansMono.variable);
