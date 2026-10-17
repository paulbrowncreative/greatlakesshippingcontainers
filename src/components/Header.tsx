"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { business, phoneHref } from "@/content/business";
import { primaryNav } from "@/content/site";
import { BrandLogo } from "./BrandLogo";
import { IconChevron, IconClose, IconMenu, IconPhone } from "./Icons";
import { TrackedLink } from "./TrackedLink";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() || "/";
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const idBase = useId();
  const tel = phoneHref();

  const closeDrawer = useCallback((returnFocus = false) => {
    setDrawerOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close menus on navigation. Adjusting state during render is React’s recommended pattern here.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setDrawerOpen(false);
  }

  useEffect(() => {
    document.body.dataset.menuOpen = drawerOpen ? "true" : "false";
    if (drawerOpen) drawerRef.current?.querySelector<HTMLElement>("a,button")?.focus();
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMenu) {
        const trigger = document.getElementById(`${idBase}-${openMenu}-trigger`);
        setOpenMenu(null);
        trigger?.focus();
      } else if (drawerOpen) closeDrawer(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (openMenu && navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu, drawerOpen, closeDrawer, idBase]);

  // Keep keyboard focus inside the open drawer.
  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !drawerRef.current) return;
    const items = Array.from(drawerRef.current.querySelectorAll<HTMLElement>("a,button"));
    const all = [toggleRef.current!, ...items];
    const first = all[0];
    const last = all[all.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <header className="site-header" onKeyDown={drawerOpen ? trapFocus : undefined}>
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${business.name} — home`}>
          <BrandLogo />
        </Link>

        <nav className="nav" aria-label="Main" ref={navRef}>
          <ul className="nav__list">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href) || item.children?.some((c) => isActive(pathname, c.href));
              if (!item.children) {
                return (
                  <li key={item.href} className="nav__item">
                    <Link href={item.href} className="nav__link" aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const open = openMenu === item.label;
              const panelId = `${idBase}-${item.label}-panel`;
              return (
                <li key={item.href} className="nav__item">
                  <button
                    type="button"
                    id={`${idBase}-${item.label}-trigger`}
                    className="nav__trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    data-active={active ? "true" : undefined}
                    onClick={() => setOpenMenu(open ? null : item.label)}
                  >
                    {item.label}
                    <IconChevron />
                  </button>
                  <div className="nav__panel" id={panelId} hidden={!open}>
                    <ul role="list">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} aria-current={pathname === c.href ? "page" : undefined}>
                            <strong>{c.label}</strong>
                            {c.description && <span>{c.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          {tel && (
            <TrackedLink href={tel} className="header-phone" event="phone_click" eventParams={{ location: "header" }}>
              {business.phone}
            </TrackedLink>
          )}
          <TrackedLink href="/quote" className="btn btn--sm header-cta" event="quote_cta_click" eventParams={{ location: "header" }}>
            Get a Quote
          </TrackedLink>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={drawerOpen}
            aria-controls={`${idBase}-drawer`}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            {drawerOpen ? <IconClose /> : <IconMenu />}
            <span>{drawerOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <div className="drawer" id={`${idBase}-drawer`} hidden={!drawerOpen} ref={drawerRef}>
        <nav className="drawer__inner" aria-label="Mobile">
          <Link href="/quote" className="btn btn--lg btn--block">
            Get a Quote
          </Link>
          {tel && (
            <TrackedLink href={tel} className="btn btn--light btn--block" event="phone_click" eventParams={{ location: "drawer" }}>
              <IconPhone /> Call {business.phone}
            </TrackedLink>
          )}
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.href} className="drawer__group">
                <p className="drawer__heading">{item.label}</p>
                {item.children.map((c) => (
                  <Link key={c.href} href={c.href} aria-current={pathname === c.href ? "page" : undefined}>
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
