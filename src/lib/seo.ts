import type { Metadata } from "next";
import { business } from "@/content/business";
import { absoluteUrl, siteUrl } from "@/content/site";
import { images } from "@/content/images";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string; width: number; height: number };
  noindex?: boolean;
  type?: "website" | "article";
};

/** Per-page metadata with canonical, Open Graph and Twitter tags kept in sync. */
export function pageMetadata({ title, description, path, image, noindex, type = "website" }: PageMeta): Metadata {
  const img = image ?? { src: "/og-default.jpg", alt: `${business.name} — ${business.tagline}`, width: 1200, height: 630 };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName: business.name,
      title,
      description,
      locale: "en_US",
      images: [{ url: img.src, width: img.width, height: img.height, alt: img.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img.src] },
  };
}

export const orgId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

/**
 * Organization rather than LocalBusiness: no verified street address, phone or hours
 * exist yet. Once the owner confirms them in business.ts, LocalBusiness fields are
 * added automatically below.
 */
export function organizationSchema() {
  const base: Record<string, unknown> = {
    "@type": business.address ? ["Organization", "LocalBusiness"] : "Organization",
    "@id": orgId,
    name: business.name,
    legalName: business.legalName,
    url: siteUrl,
    logo: absoluteUrl("/brand/logo.png"),
    image: absoluteUrl(images.hero.src),
    slogan: business.tagline,
    areaServed: { "@type": "State", name: business.state },
    sameAs: Object.values(business.social),
  };
  if (business.phone) base.telephone = business.phone;
  if (business.publicEmail) base.email = business.publicEmail;
  if (business.yearFounded) base.foundingDate = String(business.yearFounded);
  if (business.address) {
    base.address = {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: "US",
    };
  }
  return base;
}

export function websiteSchema() {
  return { "@type": "WebSite", "@id": websiteId, url: siteUrl, name: business.name, publisher: { "@id": orgId }, inLanguage: "en-US" };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: absoluteUrl(opts.path),
    provider: { "@id": orgId },
    areaServed: { "@type": "State", name: business.state },
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
