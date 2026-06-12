import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/content/brand";

export const metadata: Metadata = {
  title: `${brand.name} | Bhopal nonprofit for children, women, animals, and cleaner communities`,
  description:
    "A premium new website for WeCare NGO in Bhopal, showing education, women empowerment, animal welfare, cleanliness work, stories, and ways to donate.",
  openGraph: {
    title: `${brand.name} | हम परवाह करते हैं`,
    description:
      "Donate, volunteer, and see the real stories behind WeCare NGO's work in Bhopal.",
    images: ["/site-media/photos/01-c-ffn9xv27m.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
