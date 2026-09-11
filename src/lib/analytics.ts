"use client";

/**
 * Central event hook. No analytics provider is wired up yet — this only
 * logs in development so real analytics (PostHog, GA, etc.) can be dropped
 * in here later without touching call sites across the site.
 */
export type AnalyticsEvent =
  | "landing_page_view"
  | "join_the_yard_click"
  | "waitlist_submitted"
  | "become_a_creator_click"
  | "creator_form_submitted"
  | "become_a_founding_supporter_click"
  | "contribution_amount_selected"
  | "paypal_outbound_click"
  | "share_click";

export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics]", event, data ?? {});
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("yardfame:analytics", { detail: { event, data } }));
  }
}
