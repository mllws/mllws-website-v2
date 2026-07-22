"use client";

import { ViewTransition } from "react";

export default function PageTransition({ children }) {
  return (
    <ViewTransition
      default="none"
      enter={{ default: "page-fade-in" }}
      exit={{ default: "page-fade-out" }}
    >
      {children}
    </ViewTransition>
  );
}
