import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "Yujie Zhang — Quantum Information",
    description:
      "Yujie Zhang is a postdoctoral fellow working on quantum foundations, quantum information, quantum networks, and quantum metrology.",
    openGraph: {
      title: "Yujie Zhang — Quantum Information",
      description: "Research, publications, talks, and academic CV.",
      type: "profile",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "Yujie Zhang — Quantum Information" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yujie Zhang — Quantum Information",
      description: "Research, publications, talks, and academic CV.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
