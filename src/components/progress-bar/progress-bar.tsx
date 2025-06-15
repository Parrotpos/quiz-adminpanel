// @ts-nocheck
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./styles.css";

import NProgress from "nprogress";
import { useEffect, Suspense } from "react";

// ----------------------------------------------------------------------

export const ProgressBar = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    NProgress.configure({ showSpinner: true });

    const handleAnchorClick = (event: Event) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;

      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const attachAnchorListeners = () => {
      const anchorElements = document.querySelectorAll("a[href]");

      const filteredAnchors = Array.from(anchorElements).filter((element) => {
        const rel = element.getAttribute("rel");
        const href = element.getAttribute("href");
        const target = element.getAttribute("target");

        return (
          href?.startsWith("/") && target !== "_blank" && rel !== "noopener"
        );
      });

      filteredAnchors.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick)
      );

      return filteredAnchors; // return for cleanup
    };

    const mutationObserver = new MutationObserver(() => {
      attachAnchorListeners();
    });

    mutationObserver.observe(document, { childList: true, subtree: true });

    const attachedAnchors = attachAnchorListeners(); // attach on initial render

    const originalPushState = window.history.pushState;
    window.history.pushState = new Proxy(originalPushState, {
      apply: (target, thisArg, args: [any, string, string?]) => {
        NProgress.done();
        return target.apply(thisArg, args);
      },
    });

    return () => {
      mutationObserver.disconnect();
      attachedAnchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleAnchorClick)
      );
      window.history.pushState = originalPushState; // Restore original pushState
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <NProgressDone />
    </Suspense>
  );
};

// ----------------------------------------------------------------------

function NProgressDone() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, router, searchParams]);

  return null;
}
