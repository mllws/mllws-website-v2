"use client";

import Link from "next/link";
import LanguageHover from "@/components/LanguageHover";
import { useFeatureFlags } from "@/lib/feature-flags-context";

const HREF_KEY = {
  member: "membershipHref",
  donate: "donateHref",
  volunteer: "volunteerHref",
};

export default function InvolvedCta({ kind, className, children }) {
  const flags = useFeatureFlags();
  const href = flags[HREF_KEY[kind]] || "/contact";

  return (
    <LanguageHover href={href} className={className}>
      {children}
    </LanguageHover>
  );
}

export function MembershipSoonNote() {
  const { membershipHref } = useFeatureFlags();
  if (membershipHref !== "/contact") return null;

  return (
    <p className="mt-6 text-center text-sm text-muted">
      Membership payments will connect to Zeffy soon. For now, reach us via{" "}
      <Link href="/contact">Contact</Link>.
    </p>
  );
}
