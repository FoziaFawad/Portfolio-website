import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Syeda Fozia Fawad — Software Engineering Undergraduate & Full Stack Web Developer",
  description: "Portfolio of Syeda Fozia Fawad, Software Engineering Undergraduate at Salim Habib University. Full Stack Web Development, Cybersecurity, and Systems Architecture.",
  keywords: [
    "Syeda Fozia Fawad",
    "Fozia Fawad",
    "Software Engineering Undergraduate",
    "Full Stack Web Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Cybersecurity",
    "Salim Habib University",
    "DeepTech",
  ],
  authors: [{ name: "Syeda Fozia Fawad" }],
  openGraph: {
    title: "Syeda Fozia Fawad — Software Engineering Undergraduate & Full Stack Web Developer",
    description: "Portfolio of Syeda Fozia Fawad, Software Engineering Undergraduate at Salim Habib University.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body id="top">
        {children}
      </body>
    </html>
  );
}
