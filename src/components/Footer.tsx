import Link from "next/link";
import { business, phoneHref } from "@/content/business";
import { footerNav } from "@/content/site";
import { BrandLogo } from "./BrandLogo";
import { IconFacebook } from "./Icons";

export function Footer() {
  const tel = phoneHref();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" aria-label={`${business.name} — home`}>
              <BrandLogo />
            </Link>
            <p className="mt-4 max-prose">
              {business.legalName} sells and rents 20 ft and 40 ft shipping containers, delivered to sites in {business.state} on
              our own truck and trailer. Every order starts with a written quote for your exact site.
            </p>
            <ul className="footer-list mt-4" role="list">
              <li>
                <Link href="/quote">Request a quote online →</Link>
              </li>
              {tel && (
                <li>
                  <a href={tel}>{business.phone}</a>
                </li>
              )}
              {business.publicEmail && (
                <li>
                  <a href={`mailto:${business.publicEmail}`}>{business.publicEmail}</a>
                </li>
              )}
              {business.address && (
                <li>
                  <address style={{ fontStyle: "normal" }}>
                    {business.address.street}, {business.address.city}, {business.address.region} {business.address.postalCode}
                  </address>
                </li>
              )}
              {business.hours && <li>{business.hours}</li>}
              <li>
                <a className="social-link" href={business.social.facebook} rel="noopener" target="_blank">
                  <IconFacebook /> Facebook<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="Containers">
            <p className="footer-heading">Containers</p>
            <ul className="footer-list" role="list">
              {footerNav.containers.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="footer-heading">Company</p>
            <ul className="footer-list" role="list">
              {footerNav.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <p className="footer-heading">Legal</p>
            <ul className="footer-list" role="list">
              {footerNav.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {year} {business.legalName}. All rights reserved.
          </p>
          <p>Photos captioned &ldquo;Illustrative&rdquo; are stock images. See photo credits.</p>
        </div>
      </div>
    </footer>
  );
}
