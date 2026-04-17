"use client";
// Thin client shell wrapper so Server Components can render the cursor
// without importing it inline with ssr:false (which isn't allowed server-side).
import dynamic from "next/dynamic";
const DeveloperCursor = dynamic(() => import("./DeveloperCursor"), { ssr: false });

export default function CursorShell() {
  return <DeveloperCursor />;
}
