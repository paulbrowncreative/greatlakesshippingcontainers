import type { MetadataRoute } from "next";
import { containers } from "@/content/containers";
import { guides } from "@/content/guides";
import { serviceAreas } from "@/content/service-areas";
import { absoluteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1],
    ["/containers", 0.9],
    ["/quote", 0.9],
    ["/services/container-sales", 0.8],
    ["/services/container-rentals", 0.8],
    ["/services/delivery", 0.8],
    ["/containers/condition-grades", 0.7],
    ["/uses", 0.7],
    ["/service-area", 0.7],
    ["/guides", 0.6],
    ["/about", 0.5],
    ["/contact", 0.6],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ];
  return [
    ...pages.map(([path, priority]) => ({ url: absoluteUrl(path), priority })),
    ...containers.map((c) => ({ url: absoluteUrl(`/containers/${c.slug}`), priority: 0.9 })),
    ...serviceAreas.map((a) => ({ url: absoluteUrl(`/service-area/${a.slug}`), priority: 0.7 })),
    ...guides.map((g) => ({ url: absoluteUrl(`/guides/${g.slug}`), lastModified: g.updated, priority: 0.6 })),
  ];
}
