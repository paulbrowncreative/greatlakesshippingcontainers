import Link from "next/link";
import { slugify, type Block } from "@/content/blog";
import { InlineText } from "./InlineText";

export function tocFor(body: Block[]) {
  return body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2").map((b) => ({ id: slugify(b.text), text: b.text }));
}

export function PostBody({ body }: { body: Block[] }) {
  return (
    <>
      {body.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <InlineText text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)}>
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((it) => (
                  <li key={it}>
                    <InlineText text={it} />
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <div key={i} className="table-wrap" role="region" aria-label={b.caption ?? "Table"} tabIndex={0}>
                <table>
                  {b.caption && <caption className="sr-only">{b.caption}</caption>}
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r.join("|")}>
                        {r.map((c, j) =>
                          j === 0 ? (
                            <th key={j} scope="row">
                              {c}
                            </th>
                          ) : (
                            <td key={j}>{c}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside key={i} className="callout" aria-label={b.title}>
                <p className="callout__title">{b.title}</p>
                <p>
                  <InlineText text={b.text} />
                </p>
              </aside>
            );
          case "cta":
            return (
              <aside key={i} className="post-cta" aria-label={b.title}>
                <div>
                  <p className="post-cta__title">{b.title}</p>
                  <p>{b.text}</p>
                </div>
                <Link href={b.href} className="btn">
                  {b.label}
                </Link>
              </aside>
            );
        }
      })}
    </>
  );
}
