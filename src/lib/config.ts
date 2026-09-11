export const siteConfig = {
  name: "YardFame",
  tagline: "Fame Doesn't Stop at the Fence.",
  description:
    "YardFame is building a creator platform connecting incarcerated, formerly incarcerated, and Free World creators with the communities that support them. Join the Yard or become a Founding Supporter.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yardfame.com",
};

/**
 * PayPal has not been supplied yet. Set NEXT_PUBLIC_PAYPAL_SUPPORT_URL to a
 * real PayPal.me link or hosted checkout URL to activate contributions.
 * Until then, contribution CTAs render a "checkout being finalized" state.
 */
export const paypalSupportUrl = process.env.NEXT_PUBLIC_PAYPAL_SUPPORT_URL || "";

export const isPaypalConfigured = paypalSupportUrl.length > 0;

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@yardfame.com";
