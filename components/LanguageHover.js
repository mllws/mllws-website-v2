"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { pickRandomTranslation } from "@/lib/buttonTranslations";
import { useFeatureFlags } from "@/lib/feature-flags-context";

const LATIN_SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/** Indic + Arabic — complex shaping; do not split into code points for the meter. */
const COMPLEX_SCRIPT =
  /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isComplexScript(text) {
  return COMPLEX_SCRIPT.test(text);
}

function splitForMeter(text) {
  if (isComplexScript(text)) {
    // Keep conjuncts / matras intact — roll the whole phrase as one unit
    return [text];
  }
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)].map(
      (s) => s.segment
    );
  }
  return Array.from(text);
}

function buildReel(target, phraseMode) {
  if (target === " ") return [" "];
  if (phraseMode) {
    const steps = 3 + Math.floor(Math.random() * 2);
    const reel = [];
    for (let i = 0; i < steps; i++) {
      reel.push("·".repeat(Math.min(Math.max(target.length, 3), 8)));
    }
    reel.push(target);
    return reel;
  }
  const steps = 5 + Math.floor(Math.random() * 4);
  const reel = [];
  for (let i = 0; i < steps; i++) {
    reel.push(LATIN_SCRAMBLE[Math.floor(Math.random() * LATIN_SCRAMBLE.length)]);
  }
  reel.push(target);
  return reel;
}

function charMod(char, phraseMode) {
  if (phraseMode) return "meter-char--phrase";
  if (char === " ") return "meter-char--space";
  if (/[^\u0000-\u00ff]/.test(char)) return "meter-char--wide";
  return "";
}

function MeterChar({ char, delayMs, animate, phraseMode }) {
  const reel = useMemo(
    () => (animate ? buildReel(char, phraseMode) : [char]),
    [char, animate, phraseMode]
  );
  const steps = Math.max(reel.length - 1, 0);

  return (
    <span className={`meter-char ${charMod(char, phraseMode)}`} aria-hidden="true">
      <span
        className={animate ? "meter-char-reel meter-char-reel--run" : "meter-char-reel"}
        style={{
          "--meter-delay": `${delayMs}ms`,
          "--meter-steps": steps,
        }}
      >
        {reel.map((c, i) => (
          <span key={`${c}-${i}`} className="meter-char-glyph">
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </span>
    </span>
  );
}

function MeterText({ text, tick, animate }) {
  const phraseMode = isComplexScript(text);
  const units = splitForMeter(text);

  return (
    <span className={`meter-text${phraseMode ? " meter-text--indic" : ""}`} aria-hidden="true">
      {units.map((unit, i) => (
        <MeterChar
          key={`${tick}-${i}-${unit}`}
          char={unit}
          delayMs={animate ? i * 28 : 0}
          animate={animate}
          phraseMode={phraseMode}
        />
      ))}
    </span>
  );
}

/**
 * Experimental: on hover, button label meters into a real translation
 * of the English text; restores English on leave with the same roll.
 * Gated by the `language-hover` feature flag (see flags.js).
 */
export default function LanguageHover({
  children,
  href,
  className = "",
  type = "button",
  ...rest
}) {
  const { languageHover: enabled } = useFeatureFlags();
  const original = typeof children === "string" ? children : String(children ?? "");
  const [text, setText] = useState(original);
  const [lang, setLang] = useState("en");
  const [tick, setTick] = useState(0);
  const [animate, setAnimate] = useState(false);

  function rollTo(nextText, nextLang) {
    const reduce = prefersReducedMotion();
    setAnimate(!reduce);
    setText(nextText);
    setLang(nextLang);
    setTick((n) => n + 1);
  }

  function showTranslation() {
    const { text: next, lang: nextLang } = pickRandomTranslation(
      original,
      lang === "en" ? null : lang
    );
    rollTo(next, nextLang);
  }

  function restore() {
    rollTo(original, "en");
  }

  const label = (
    <span className="relative inline-grid place-items-center text-center align-middle">
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {original}
      </span>
      <span
        className={`invisible col-start-1 row-start-1 whitespace-nowrap${
          isComplexScript(text) ? " meter-text--indic" : ""
        }`}
        aria-hidden="true"
      >
        {text}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap">
        <MeterText text={text} tick={tick} animate={animate} />
      </span>
    </span>
  );

  // Hover only — focus/click must not remount the label or clicks get swallowed
  const interaction = {
    onMouseEnter: showTranslation,
    onMouseLeave: restore,
  };

  // Feature flag off: plain Link/anchor/button (pre-experiment UI)
  if (!enabled) {
    if (href) {
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a href={href} className={className} {...rest}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={className} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <button type={type} className={className} {...rest}>
        {children}
      </button>
    );
  }

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} className={className} aria-label={original} {...interaction} {...rest}>
          {label}
        </a>
      );
    }
    return (
      <Link href={href} className={className} aria-label={original} {...interaction} {...rest}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} className={className} aria-label={original} {...interaction} {...rest}>
      {label}
    </button>
  );
}
