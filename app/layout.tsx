import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "Quantum Information Researcher",
    description: "Academic profile, research interests, publications, talks, and CV.",
    openGraph: {
      title: "Your Name — Quantum Information",
      description: "Research, publications, talks, and academic CV.",
      type: "profile",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "Your Name — Quantum Information" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Your Name — Quantum Information",
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
