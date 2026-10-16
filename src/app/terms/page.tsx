import { PageHero } from "@/components/PageHero";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use | Great Lakes Shipping Containers",
  description: "Terms governing use of the Great Lakes Shipping Containers LLC website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of use" crumbs={[{ name: "Terms of Use", path: "/terms" }]} lede="Last updated October 16, 2026" />
      <section className="section section--white">
        <div className="container prose">
          <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
          <h2>Information on this site</h2>
          <p>
            Container dimensions, weights and capacities shown on this site are typical industry figures provided for general guidance.
            Actual units vary by manufacturer, build year and condition. Delivery clearances are rules of thumb. The specifications,
            condition, price and delivery terms that apply to your purchase are those stated in your written quote or invoice from{" "}
            {business.legalName}.
          </p>
          <h2>Quotes</h2>
          <p>
            Submitting a request through this website does not create an order or a contract. A quote becomes binding only when you
            accept it in writing and any terms it states are met.
          </p>
          <h2>Photographs</h2>
          <p>
            Unless a caption says otherwise, photographs on this site are illustrative and do not show specific units we have for
            sale. Photographs are used under license; see Photo Credits.
          </p>
          <h2>Local rules</h2>
          <p>
            You are responsible for confirming that placing a container at your site complies with local zoning, permitting, HOA and
            property rules.
          </p>
          <h2>Acceptable use</h2>
          <p>Do not misuse the site, including by submitting false information, automated or bulk submissions, or attempting to interfere with its operation.</p>
          <h2>Liability</h2>
          <p>
            The site is provided &ldquo;as is.&rdquo; To the extent permitted by law, {business.legalName} is not liable for damages arising
            from use of the website or reliance on its general information.
          </p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the State of Michigan.</p>
        </div>
      </section>
    </>
  );
}
