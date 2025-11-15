"use client";

import { VisitorCounter } from "./visitor-counter";

export function VisitorCounterWrapper() {
  // Start with 0, the client component will fetch the actual count on mount
  return <VisitorCounter initialCount={0} />;
}


