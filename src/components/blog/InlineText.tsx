import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * Renders the blog's tiny inline syntax: **bold** and [text](href). Internal links use
 * next/link; external links open in a new tab. Content is authored in-repo, never user input.
 */
export function InlineText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const [label, href] = [m[1], m[2]];
      out.push(
        href.startsWith("http") ? (
          <a key={i++} href={href} target="_blank" rel="noopener">
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <Link key={i++} href={href}>
            {label}
          </Link>
        ),
      );
    } else {
      out.push(<strong key={i++}>{m[3]}</strong>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}
