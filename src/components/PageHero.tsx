import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/content/images";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs: Crumb[];
  image?: SiteImage;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lede, crumbs, image, children }: Props) {
  return (
    <section className={`page-hero${image ? " page-hero--media" : ""}`}>
      {image && (
        <div className="page-hero__img">
          <Image src={image.src} alt="" fill priority sizes="100vw" />
        </div>
      )}
      <div className="container">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children && <div className="page-hero__actions cluster">{children}</div>}
      </div>
    </section>
  );
}
