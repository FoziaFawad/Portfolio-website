import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Syeda Fozia Fawad | Software Engineering Student",
  description: "Portfolio of Syeda Fozia Fawad, Software Engineering Student at Salim Habib University. Specializing in React, Next.js, TypeScript, and Cybersecurity.",
  keywords: ["Syeda Fozia Fawad", "Fozia Fawad", "Software Engineering Student", "Next.js", "TypeScript", "React", "Cybersecurity", "Salim Habib University", "DeepTech"],
  authors: [{ name: "Syeda Fozia Fawad" }],
  openGraph: {
    title: "Syeda Fozia Fawad | Software Engineering Student",
    description: "Portfolio of Syeda Fozia Fawad, Software Engineering Student at Salim Habib University.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased dark">
      <body className="min-h-screen flex flex-col font-sans bg-[#0d0d12] text-[#f4f4f6]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
