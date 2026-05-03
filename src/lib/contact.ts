/**
 * Contact form payload + validation.
 * Pure module — safe to import from both client components and the API route.
 * The same rules run in both places, so client UX matches server enforcement.
 */

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Honeypot — bots fill it; humans don't see it. */
  website?: string;
  /** Token from Google reCAPTCHA when wired up. */
  recaptchaToken?: string;
}

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export type ValidationResult =
  | { ok: true; value: Required<Omit<ContactPayload, "recaptchaToken">> & { recaptchaToken?: string } }
  | { ok: false; fieldErrors: FieldErrors };

/* -------------------------------------------------------------------------- */

const NAME_MIN = 1;
const NAME_MAX = 100;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * Validates and normalises a contact payload. Trims strings, enforces required
 * fields, and applies length + format rules. Returns either the cleaned value
 * or a map of human-readable field errors.
 */
export function validateContact(input: unknown): ValidationResult {
  const raw = (input ?? {}) as Record<string, unknown>;

  const name = asString(raw.name).trim();
  const email = asString(raw.email).trim();
  const message = asString(raw.message).trim();
  const website = asString(raw.website); // honeypot — leave as-is
  const recaptchaToken = typeof raw.recaptchaToken === "string" ? raw.recaptchaToken : undefined;

  const fieldErrors: FieldErrors = {};

  if (name.length < NAME_MIN) {
    fieldErrors.name = "Please enter your name.";
  } else if (name.length > NAME_MAX) {
    fieldErrors.name = `Name must be ${NAME_MAX} characters or fewer.`;
  }

  if (!email) {
    fieldErrors.email = "Please enter your email.";
  } else if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (message.length < MESSAGE_MIN) {
    fieldErrors.message = `Message must be at least ${MESSAGE_MIN} characters.`;
  } else if (message.length > MESSAGE_MAX) {
    fieldErrors.message = `Message must be ${MESSAGE_MAX} characters or fewer.`;
  } else {
    // Anti-spam heuristics
    const urlCount = (message.match(/https?:\/\//g) || []).length;
    if (urlCount > 2) {
      fieldErrors.message = "Message contains too many links. Please reduce them.";
    } else if (message.match(/<a\s+href=|\[url=/i)) {
      fieldErrors.message = "HTML/BBCode links are not permitted.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: { name, email, message, website, recaptchaToken },
  };
}

/** Wire response shape — used by both the API route and the client form. */
export type ContactApiResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: FieldErrors };
