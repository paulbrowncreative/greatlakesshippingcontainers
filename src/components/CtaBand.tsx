import { business, phoneHref } from "@/content/business";
import { TrackedLink } from "./TrackedLink";

type Props = { title?: string; body?: string; ctaLabel?: string; ctaHref?: string; location: string };

export function CtaBand({
  title = "Tell us where it’s going. We’ll quote the rest.",
  body = "Size, condition and delivery to your ZIP code — one written quote, usually with a few quick questions about your site. No obligation.",
  ctaLabel = "Request a Quote",
  ctaHref = "/quote",
  location,
}: Props) {
  const tel = phoneHref();
  return (
    <section className="cta-band" aria-labelledby={`cta-${location}`}>
      <div className="container cta-band__inner">
        <div>
          <h2 id={`cta-${location}`}>{title}</h2>
          <p className="mt-3 max-prose">{body}</p>
        </div>
        <div className="cluster">
          <TrackedLink href={ctaHref} className="btn btn--lg" event="quote_cta_click" eventParams={{ location }}>
            {ctaLabel}
          </TrackedLink>
          {tel && (
            <TrackedLink href={tel} className="btn btn--lg btn--light" event="phone_click" eventParams={{ location }}>
              Call {business.phone}
            </TrackedLink>
          )}
        </div>
      </div>
    </section>
  );
}
