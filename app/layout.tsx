import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yujie4phy.github.io"),
  title: "Yujie Zhang — Quantum Information",
  description:
    "Yujie Zhang is a postdoctoral fellow working on quantum foundations, quantum information, quantum networks, and quantum metrology.",
  openGraph: {
    title: "Yujie Zhang — Quantum Information",
    description: "Research, publications, talks, and academic CV.",
    type: "profile",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Yujie Zhang — Quantum Information" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yujie Zhang — Quantum Information",
    description: "Research, publications, talks, and academic CV.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
