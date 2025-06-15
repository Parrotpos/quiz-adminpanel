// @ts-nocheck
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./styles.css";

import NProgress from "nprogress";
import { Suspense, useEffect } from "react";

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

    const handleMutation = () => {
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
    };

    const mutationObserver = new MutationObserver(handleMutation);

    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, [state, title, url]: [any, string, string?]) => {
        NProgress.done();
        return target.apply(thisArg, [state, title, url]);
      },
    });
  });

  return <NProgressDone />;
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
