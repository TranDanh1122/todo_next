import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/ThemeContext";

const josefin = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Todo App",
  description: "Tran Danh First Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.variable}  antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
