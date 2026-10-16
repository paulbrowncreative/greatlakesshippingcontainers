/**
 * Location pages are generated only from this list. Add a market here only once the
 * owner confirms the company actively delivers there, and write content that is
 * genuinely specific to it (roads, access patterns, local rules). Never swap city
 * names into a template — that is a doorway page.
 */
export type ServiceArea = {
  slug: string; // e.g. "metro-detroit"
  name: string; // e.g. "Metro Detroit"
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  communities: string[];
  localNotes: { title: string; body: string }[];
};

export const serviceAreas: ServiceArea[] = [];
