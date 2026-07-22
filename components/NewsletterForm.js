"use client";

import { useState } from "react";
import LanguageHover from "@/components/LanguageHover";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email) setSubscribed(true);
  }

  if (subscribed) {
    return (
      <div className="flex items-center gap-2.5 text-[15px] font-bold text-white">
        ✓ You&apos;re subscribed — welcome!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="min-w-[260px] rounded-full border-0 bg-white/15 px-5 py-3.5 text-[15px] text-white placeholder:text-white/75"
      />
      <LanguageHover
        type="submit"
        className="cursor-pointer rounded-full border-0 bg-white px-[26px] py-3.5 text-[15px] font-bold text-brand transition hover:scale-105"
      >
        Subscribe
      </LanguageHover>
    </form>
  );
}
