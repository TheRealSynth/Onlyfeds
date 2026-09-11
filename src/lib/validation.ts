export const WAITLIST_ROLES = [
  "Creator",
  "Supporter / Fan",
  "Creator Manager",
  "Family Member",
  "Potential Partner",
  "Media",
  "Other",
] as const;

export const CREATOR_STAGES = [
  "Fed Baby",
  "State Baby",
  "Coming Home",
  "Touched Down",
  "Free World",
  "Manager / Family Applying for Creator",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_RE.test(value);
}

function optionalString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, maxLength) : null;
}

export type WaitlistPayload = {
  name: string;
  email: string;
  role: (typeof WAITLIST_ROLES)[number];
  message: string | null;
};

export type ValidationResult<T> = { ok: true; data: T } | { ok: false; error: string };

export function validateWaitlistPayload(body: unknown): ValidationResult<WaitlistPayload> {
  const { name, email, role, message } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 1) {
    return { ok: false, error: "Name is required." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "A valid email is required." };
  }
  if (typeof role !== "string" || !WAITLIST_ROLES.includes(role as (typeof WAITLIST_ROLES)[number])) {
    return { ok: false, error: "A valid role is required." };
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role as (typeof WAITLIST_ROLES)[number],
      message: optionalString(message, 2000),
    },
  };
}

export type CreatorInterestPayload = {
  name: string;
  email: string;
  stage: (typeof CREATOR_STAGES)[number];
  alias: string | null;
  managedBy: string | null;
  background: string | null;
  contentType: string | null;
  socialLinks: string | null;
};

export function validateCreatorInterestPayload(body: unknown): ValidationResult<CreatorInterestPayload> {
  const { name, email, stage, alias, managedBy, background, contentType, socialLinks } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || name.trim().length < 1) {
    return { ok: false, error: "Name is required." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "A valid email is required." };
  }
  if (typeof stage !== "string" || !CREATOR_STAGES.includes(stage as (typeof CREATOR_STAGES)[number])) {
    return { ok: false, error: "A valid creator stage is required." };
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      stage: stage as (typeof CREATOR_STAGES)[number],
      alias: optionalString(alias, 200),
      managedBy: optionalString(managedBy, 200),
      background: optionalString(background, 2000),
      contentType: optionalString(contentType, 500),
      socialLinks: optionalString(socialLinks, 1000),
    },
  };
}
