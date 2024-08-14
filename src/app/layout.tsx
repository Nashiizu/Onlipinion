import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import NavBar from "./components/NavBar/NavBar";
import Box from "./components/Box/box";
import "./globals.css"

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "ONLIPINION",
  description: "Descrição do meu projeto",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={ubuntu.className}><NavBar />{children}</body>
    </html>
  );
}
