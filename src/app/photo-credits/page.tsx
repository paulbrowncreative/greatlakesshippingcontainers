import { PageHero } from "@/components/PageHero";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photo Credits | Great Lakes Shipping Containers",
  description: "Credits for the illustrative photography used on this website.",
  path: "/photo-credits",
  noindex: true,
});

export default function CreditsPage() {
  const list = Object.values(images);
  return (
    <>
      <PageHero title="Photo credits" crumbs={[{ name: "Photo Credits", path: "/photo-credits" }]} lede="Photos marked “Illustrative” are licensed stock images, not our inventory or projects." />
      <section className="section section--white">
        <div className="container prose">
          <p>The following images are used under the Unsplash License. Thank you to the photographers.</p>
          <ul>
            {list.map((img) => (
              <li key={img.src}>
                {img.alt}. Photo by {img.credit.name} on{" "}
                <a href={img.credit.url} rel="noopener" target="_blank">
                  Unsplash<span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
