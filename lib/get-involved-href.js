/**
 * Live Get Involved URLs (Zeffy later). A CTA uses the campaign URL only
 * when its feature flag is on and the env value is a non-empty https URL.
 * Otherwise the site keeps /contact.
 */
export function liveHttpsUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return "";
    return parsed.href;
  } catch {
    return "";
  }
}

export function getInvolvedHref({ enabled, url, fallback = "/contact" }) {
  if (!enabled) return fallback;
  return liveHttpsUrl(url) || fallback;
}

export function getInvolvedUrls({
  becomeAMember = false,
  donate = false,
  volunteer = false,
} = {}) {
  return {
    membershipHref: getInvolvedHref({
      enabled: becomeAMember,
      url: process.env.ZEFFY_MEMBERSHIP_URL,
    }),
    donateHref: getInvolvedHref({
      enabled: donate,
      url: process.env.ZEFFY_DONATE_URL,
    }),
    volunteerHref: getInvolvedHref({
      enabled: volunteer,
      url: process.env.ZEFFY_VOLUNTEER_URL,
    }),
  };
}

export function isLiveInvolvedHref(href) {
  return /^https:\/\//.test(String(href || ""));
}

export function involvedLinkProps(href) {
  if (!isLiveInvolvedHref(href)) return {};
  return { target: "_blank", rel: "noopener noreferrer" };
}
