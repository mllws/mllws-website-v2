"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, siteLogo } from "@/lib/data";

function DesktopDropdown({ item, isActive }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonId = `nav-trigger-${item.label.replace(/\s+/g, "-").toLowerCase()}`;
  const menuId = `nav-menu-${item.label.replace(/\s+/g, "-").toLowerCase()}`;

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-accent ${
          isActive ? "text-accent" : "text-brand-dark"
        }`}
      >
        {item.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
          className={`mt-0.5 fill-current transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </button>
      <div
        id={menuId}
        role="menu"
        aria-labelledby={buttonId}
        hidden={!open}
        className="absolute left-0 top-full z-10 mt-1 w-56 rounded-lg border border-border-muted bg-white py-2 shadow-lg"
      >
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-foreground hover:bg-surface-muted hover:text-accent"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setMobileSubOpen(false);
  }, [pathname]);

  const isItemActive = (item) =>
    pathname === item.href || item.children?.some((c) => c.href === pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-border-muted bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 rounded-md">
          <Image
            src={siteLogo}
            alt="Mother Language Lovers of the World Society — home"
            width={160}
            height={48}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-1">
          {nav.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.label} item={item} isActive={isItemActive(item)} />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-accent ${
                  pathname === item.href ? "text-accent" : "text-brand-dark"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="flex flex-col gap-1.5 rounded-md p-2 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-6 bg-brand-dark transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-brand-dark transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-brand-dark transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!mobileOpen}
        className="border-t border-border-muted bg-white px-4 pb-4 md:hidden"
      >
        {nav.map((item) =>
          item.children ? (
            <div key={item.label} className="py-1">
              <button
                type="button"
                aria-expanded={mobileSubOpen}
                aria-controls="mobile-sub-nav"
                className="flex w-full items-center justify-between rounded-md py-2 text-sm font-semibold uppercase text-brand-dark"
                onClick={() => setMobileSubOpen((v) => !v)}
              >
                {item.label}
                <span aria-hidden="true">{mobileSubOpen ? "−" : "+"}</span>
              </button>
              <div
                id="mobile-sub-nav"
                hidden={!mobileSubOpen}
                className="ml-3 flex flex-col border-l border-border-muted pl-3"
              >
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    aria-current={pathname === child.href ? "page" : undefined}
                    className="py-2 text-sm text-foreground"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="block rounded-md py-2 text-sm font-semibold uppercase text-brand-dark"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
