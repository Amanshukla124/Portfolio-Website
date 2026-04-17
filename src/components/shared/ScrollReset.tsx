"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Force instant scroll to top on every route change — prevents the
    // smooth-scroll "animation to top" that happens when navigating with
    // scroll-behavior: smooth on the html element.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
