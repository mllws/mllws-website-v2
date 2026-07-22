"use client";

import { createContext, useContext } from "react";

const DEFAULT_FLAGS = {
  languageHover: false,
};

const FeatureFlagsContext = createContext(DEFAULT_FLAGS);

/**
 * Makes server-evaluated feature flag values (see ../flags.js) available to
 * client components. Flags are decided once per request in a Server
 * Component (app/layout.js) and passed down here, since flag() itself can
 * only run on the server.
 */
export function FeatureFlagsProvider({ value, children }) {
  return (
    <FeatureFlagsContext.Provider value={{ ...DEFAULT_FLAGS, ...value }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  return useContext(FeatureFlagsContext);
}
