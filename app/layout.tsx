import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const display = Newsreader({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Math for Designer", template: "%s · Math for Designer" },
  description: "A visual, interactive 12-week mathematics course for creative thinkers.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Math for Designer", description: "See the pattern. Shape the idea.", images: [{ url: "/og.png", width: 1792, height: 1024 }] },
  twitter: { card: "summary_large_image", title: "Math for Designer", description: "See the pattern. Shape the idea.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="mfdlight" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem('mfd-theme')||'mfdlight'}catch(e){}` }}/></head><body className={`${sans.variable} ${display.variable}`}>{children}</body></html>;
}
