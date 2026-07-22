"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, siteLogo } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        aria-label="Primary"
        className={`sticky top-0 z-50 grid grid-cols-[auto_1fr_auto] items-center gap-x-5 transition-[margin,padding,border-radius,background-color,box-shadow,border-color] duration-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          scrolled
            ? "mx-4 mt-3.5 rounded-full border border-accent/20 bg-[#fffbf4]/92 px-5 py-2.5 shadow-[0_10px_30px_rgba(34,31,26,0.14)] backdrop-blur-[10px] sm:mx-6"
            : "border-b border-border-muted bg-background/90 px-6 py-4 backdrop-blur-[10px] sm:px-12"
        }`}
      >
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center gap-2.5 text-foreground no-underline hover:text-foreground"
        >
          <Image
            src={siteLogo}
            alt="Mother Language Lovers of the World Society"
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="font-display text-[15px] font-extrabold leading-tight tracking-tight sm:text-base">
            Mother Language Lovers
            <br />
            <span className="text-xs font-semibold text-muted">of the World Society</span>
          </span>
        </Link>

        {/* Desktop animated layers — pointer-events only on the interactive children */}
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden={false}>
          <div
            className={`absolute top-1/2 left-1/2 flex gap-8 whitespace-nowrap transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              scrolled
                ? "translate-x-[calc(-50%+70px)] -translate-y-1/2 scale-[0.98] opacity-0"
                : "-translate-x-1/2 -translate-y-1/2 scale-100 opacity-100"
            }`}
          >
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  tabIndex={scrolled ? -1 : undefined}
                  className={`pointer-events-auto inline-block whitespace-nowrap text-[15px] font-semibold no-underline transition hover:-translate-y-0.5 hover:text-accent ${
                    scrolled ? "pointer-events-none" : ""
                  } ${active ? "text-accent" : "text-foreground"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div
            className={`absolute top-1/2 w-max whitespace-nowrap transition-[left,transform] duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              scrolled
                ? "left-1/2 -translate-x-1/2 -translate-y-1/2"
                : "left-[calc(100%-48px)] -translate-x-full -translate-y-1/2"
            }`}
          >
            <Link
              href="/membership"
              className={`pointer-events-auto inline-block rounded-full bg-gradient-to-r from-accent via-accent-dark to-purple px-[22px] py-[11px] text-sm font-bold !text-white no-underline transition-[box-shadow] duration-[350ms] hover:!text-white ${
                scrolled
                  ? "shadow-[0_8px_20px_rgba(179,69,47,0.35)]"
                  : "shadow-[0_4px_12px_rgba(179,69,47,0.2)]"
              }`}
            >
              Get Involved
            </Link>
          </div>
        </div>

        {/* Spacer for grid middle column */}
        <div className="hidden md:block" />

        <div className="relative z-10 flex h-11 min-w-[42px] items-center justify-end gap-2">
          <Link
            href="/membership"
            className="rounded-full bg-gradient-to-r from-accent via-accent-dark to-purple px-4 py-2 text-sm font-bold !text-white no-underline hover:!text-white md:hidden"
          >
            Join
          </Link>

          {/* Mobile hamburger — always available under md */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-[42px] w-[42px] flex-col items-center justify-center gap-1 rounded-xl border-0 bg-white md:hidden"
          >
            <span className={`h-0.5 w-[18px] rounded bg-foreground transition ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-0.5 w-[18px] rounded bg-foreground transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-[18px] rounded bg-foreground transition ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>

          {/* Desktop hamburger — fades in as Get Involved slides to center */}
          <div
            aria-hidden={!scrolled}
            className={`absolute inset-0 hidden items-center justify-end transition-[opacity,transform] duration-300 md:flex ${
              scrolled
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none translate-y-2 scale-[0.98] opacity-0"
            }`}
          >
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              tabIndex={scrolled ? undefined : -1}
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex h-[42px] w-[42px] flex-col items-center justify-center gap-1 rounded-xl border-0 transition-colors ${
                menuOpen ? "bg-foreground/5" : "bg-white"
              }`}
            >
              <span className={`h-0.5 w-[18px] rounded bg-foreground transition ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-0.5 w-[18px] rounded bg-foreground transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-[18px] rounded bg-foreground transition ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="animate-dropdown-pop fixed inset-0 z-[200] flex overflow-hidden bg-background"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {["Hello", "Bonjour", "Hola", "こんにちは", "مرحبا", "নমস্কার", "你好", "Olá"].map((word, i) => (
              <span
                key={word}
                className="font-display absolute font-extrabold whitespace-nowrap text-foreground opacity-5"
                style={{
                  left: `${8 + ((i * 47) % 84)}%`,
                  top: `${10 + ((i * 31) % 80)}%`,
                  fontSize: `${20 + (i % 3) * 10}px`,
                  transform: `rotate(${(i % 2 ? -1 : 1) * (4 + i)}deg)`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute top-7 right-8 z-10 flex h-11 w-11 items-center justify-center rounded-xl border-0 bg-foreground/8 text-2xl text-foreground"
          >
            ×
          </button>
          <div className="relative z-[1] m-auto w-full max-w-[760px] px-12">
            {nav.map((item, i) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-baseline gap-6 border-b border-border-muted py-[18px] font-display text-4xl font-extrabold no-underline transition hover:pl-4 hover:text-accent ${
                    active ? "text-accent" : "text-foreground"
                  }`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className="font-display text-base font-bold text-muted-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col">
                    <span>{item.label}</span>
                    <span className="mt-0.5 text-sm font-semibold text-muted-light">{item.translated}</span>
                  </span>
                </Link>
              );
            })}
            <Link
              href="/membership"
              onClick={() => setMenuOpen(false)}
              className="mt-8 inline-block rounded-full bg-gradient-to-r from-accent via-accent-dark to-purple px-7 py-3.5 font-bold !text-white no-underline hover:!text-white"
            >
              Get Involved
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
