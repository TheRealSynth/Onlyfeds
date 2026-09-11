import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isValidEmail,
  validateWaitlistPayload,
  validateCreatorInterestPayload,
} from "../src/lib/validation.ts";

test("isValidEmail accepts well-formed addresses", () => {
  assert.equal(isValidEmail("a@b.com"), true);
  assert.equal(isValidEmail("first.last+tag@sub.example.co"), true);
});

test("isValidEmail rejects malformed addresses", () => {
  assert.equal(isValidEmail("not-an-email"), false);
  assert.equal(isValidEmail("missing@domain"), false);
  assert.equal(isValidEmail(""), false);
  assert.equal(isValidEmail(undefined), false);
});

test("validateWaitlistPayload accepts a full valid submission", () => {
  const result = validateWaitlistPayload({
    name: "  Jamie Rivera  ",
    email: "Jamie@Example.com",
    role: "Supporter / Fan",
    message: "  excited to join  ",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.name, "Jamie Rivera");
    assert.equal(result.data.email, "jamie@example.com");
    assert.equal(result.data.role, "Supporter / Fan");
    assert.equal(result.data.message, "excited to join");
  }
});

test("validateWaitlistPayload allows omitted optional message", () => {
  const result = validateWaitlistPayload({ name: "Jamie", email: "jamie@example.com", role: "Creator" });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.message, null);
});

test("validateWaitlistPayload rejects missing name", () => {
  const result = validateWaitlistPayload({ email: "jamie@example.com", role: "Creator" });
  assert.equal(result.ok, false);
});

test("validateWaitlistPayload rejects invalid email", () => {
  const result = validateWaitlistPayload({ name: "Jamie", email: "not-an-email", role: "Creator" });
  assert.equal(result.ok, false);
});

test("validateWaitlistPayload rejects unknown role", () => {
  const result = validateWaitlistPayload({ name: "Jamie", email: "jamie@example.com", role: "CEO" });
  assert.equal(result.ok, false);
});

test("validateWaitlistPayload rejects empty body", () => {
  const result = validateWaitlistPayload(null);
  assert.equal(result.ok, false);
});

test("validateCreatorInterestPayload accepts a full valid submission", () => {
  const result = validateCreatorInterestPayload({
    name: "Jordan",
    email: "jordan@example.com",
    stage: "Coming Home",
    alias: "J-Dawg",
    managedBy: "Sister",
    background: "Been writing since inside.",
    contentType: "Music, storytelling",
    socialLinks: "instagram.com/jdawg",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.stage, "Coming Home");
    assert.equal(result.data.alias, "J-Dawg");
  }
});

test("validateCreatorInterestPayload allows omitted optional fields", () => {
  const result = validateCreatorInterestPayload({ name: "Jordan", email: "jordan@example.com", stage: "Free World" });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.alias, null);
    assert.equal(result.data.managedBy, null);
  }
});

test("validateCreatorInterestPayload rejects unknown stage", () => {
  const result = validateCreatorInterestPayload({ name: "Jordan", email: "jordan@example.com", stage: "Retired" });
  assert.equal(result.ok, false);
});

test("validateCreatorInterestPayload rejects missing email", () => {
  const result = validateCreatorInterestPayload({ name: "Jordan", stage: "Free World" });
  assert.equal(result.ok, false);
});
