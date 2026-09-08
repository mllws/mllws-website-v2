"use client";

import { useState } from "react";
import Script from "next/script";

export default function NewsletterForm() {
  const [showFallback, setShowFallback] = useState(false);

  function handleEmbedError() {
    setShowFallback(true);
  }

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-2xl bg-white text-foreground">
      {!showFallback && (
        <div data-zeffy-embed data-form-url="/en-CA/embed/newsletter-form/sign-up-for-our-newsletter-4295" />
      )}
      {showFallback && (
        <div className="relative h-[280px] w-full overflow-hidden">
          <iframe
            title="Signup form powered by Zeffy"
            className="absolute inset-0 h-full w-full border-0"
            src="https://www.zeffy.com/en-CA/embed/newsletter-form/sign-up-for-our-newsletter-4295"
            allowTransparency="true"
          />
        </div>
      )}
      <Script
        src="https://www.zeffy.com/embed/v2/zeffy-embed.js"
        onError={handleEmbedError}
      />
    </div>
  );
}
