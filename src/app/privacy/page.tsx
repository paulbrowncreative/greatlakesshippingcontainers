import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy | Great Lakes Shipping Containers",
  description: "How Great Lakes Shipping Containers LLC collects, uses and protects information submitted through this website.",
  path: "/privacy",
});

const analytics = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy policy" crumbs={[{ name: "Privacy Policy", path: "/privacy" }]} lede="Last updated October 16, 2026" />
      <section className="section section--white">
        <div className="container prose">
          <p>
            This policy explains what information {business.legalName} (&ldquo;we&rdquo;) collects through this website and how we use
            it. We collect only what we need to answer your request.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Information you submit</strong> in our quote and contact forms: your name, email address, phone number, company
              (optional), delivery ZIP code, project details and message.
            </li>
            <li>
              <strong>Technical information</strong> our hosting provider records automatically, such as IP address, browser type and
              pages requested, used for security and to keep the site running.
            </li>
            {analytics && (
              <li>
                <strong>Usage analytics</strong> through Google Analytics, which uses cookies to measure how visitors use the site
                (for example, which pages are viewed and whether a form was submitted). IP addresses are anonymized.
              </li>
            )}
          </ul>
          <h2>How we use it</h2>
          <ul>
            <li>To respond to your inquiry and prepare a quote.</li>
            <li>To arrange delivery if you choose to buy.</li>
            <li>To protect the site and our forms from spam and abuse.</li>
            {analytics && <li>To understand which pages are useful and improve the site.</li>}
          </ul>
          <p>
            We do not sell your information, and we do not add you to marketing lists from a quote or contact request.
          </p>
          <h2>Who processes it</h2>
          <p>
            Form submissions are delivered to our team by email through a transactional email provider (Resend). Our website host
            processes requests to serve the site.
            {turnstile && " Cloudflare Turnstile checks form submissions for automated abuse."}
            {analytics && " Google Analytics processes usage data on our behalf."} These providers handle data only to provide their
            services to us.
          </p>
          <h2>How long we keep it</h2>
          <p>
            Inquiry emails are kept in our business email for as long as needed to serve you and meet our record-keeping obligations.
            The website itself does not store your form submissions in a database.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us what information we hold about you, or ask us to delete it, by sending a message through our{" "}
            <Link href="/contact">contact form</Link>.
          </p>
          <h2>Children</h2>
          <p>This website is not directed to children under 13, and we do not knowingly collect their information.</p>
          <h2>Changes</h2>
          <p>We may update this policy. The date at the top shows when it last changed.</p>
        </div>
      </section>
    </>
  );
}
