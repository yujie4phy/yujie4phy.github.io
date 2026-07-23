import { Fragment, type ReactNode } from "react";

const richTextPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function RichText({ text }: { text: string }) {
  const parts = text.split(richTextPattern).filter(Boolean);

  return (
    <>
      {parts.map((part, index): ReactNode => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={`${index}-${part}`}>{part.slice(2, -2)}</strong>;
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <a href={link[2]} key={`${index}-${link[2]}`}>
              {link[1]}
            </a>
          );
        }

        return <Fragment key={`${index}-${part}`}>{part}</Fragment>;
      })}
    </>
  );
}
