"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Soft exit fade before Next.js navigates; template.js plays the enter
 * animation after the new page mounts. No View Transitions dependency.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  useLayoutEffect(() => {
    setLeaving(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest("a[href]");
      if (!a) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      if (a.target === "_blank" || a.hasAttribute("download")) return;

      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname && url.search === window.location.search && !url.hash) return;

      e.preventDefault();
      setLeaving(true);
      window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      }, 180);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, router]);

  return (
    <div className={`page-shell${leaving ? " page-shell--leaving" : ""}`}>{children}</div>
  );
}
