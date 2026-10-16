import { PageHero } from "@/components/PageHero";
import { images, type SiteImage } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photo Credits | Great Lakes Shipping Containers",
  description: "Credits for the illustrative photography used on this website.",
  path: "/photo-credits",
  noindex: true,
});

export default function CreditsPage() {
  const all: SiteImage[] = Object.values(images);
  const stock = all.filter((img) => img.credit);
  return (
    <>
      <PageHero title="Photo credits" crumbs={[{ name: "Photo Credits", path: "/photo-credits" }]} lede="Photos captioned “Illustrative photo” are not our inventory. Uncaptioned and “example unit” photos are our own." />
      <section className="section section--white">
        <div className="container prose">
          <p>These stock images are used under the Unsplash License. Thank you to the photographers.</p>
          <ul>
            {stock.map((img) => (
              <li key={img.src}>
                {img.alt}. Photo by {img.credit!.name} on{" "}
                <a href={img.credit!.url} rel="noopener" target="_blank">
                  Unsplash<span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </li>
            ))}
          </ul>
          <p>Container photos without an &ldquo;Illustrative&rdquo; caption are supplied by Great Lakes Shipping Containers and show example units; availability changes, and your quote confirms the exact unit.</p>
        </div>
      </section>
    </>
  );
}
