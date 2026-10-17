import type { MetadataRoute } from "next";
import { business } from "@/content/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#4fb8f2",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
