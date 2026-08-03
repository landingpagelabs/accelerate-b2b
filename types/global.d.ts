export {};

declare global {
  interface Window {
    /** Created by the GTM snippet in app/layout.tsx; components push conversion events onto it. */
    dataLayer: Record<string, unknown>[];
  }
}
