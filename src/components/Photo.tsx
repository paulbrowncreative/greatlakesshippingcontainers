import Image from "next/image";
import type { SiteImage } from "@/content/images";

type Props = {
  image: SiteImage;
  aspect?: "4x3" | "3x2" | "tall";
  sizes?: string;
  priority?: boolean;
  /** Caption for company photos; stock photos are always labelled "Illustrative photo". */
  companyCaption?: string;
};

/** Framed photo whose caption always tells the truth about where the image came from. */
export function Photo({ image, aspect = "4x3", sizes = "(min-width: 60rem) 45vw, 100vw", priority, companyCaption }: Props) {
  const caption = image.illustrative ? "Illustrative photo" : companyCaption;
  return (
    <figure className={`media media--${aspect}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} preload={priority} fetchPriority={priority ? "high" : undefined} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
