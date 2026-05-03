import { NextResponse, type NextRequest } from "next/server";

import { validateContact, type ContactApiResponse } from "@/lib/contact";
import { sendContactEmail } from "@/lib/email";

/**
 * Contact form endpoint.
 *
 * Pipeline:
 *   1. Parse JSON body (reject malformed input early).
 *   2. Validate with the same rules used on the client.
 *   3. Honeypot check — silently ack to avoid tipping bots off.
 *   4. (Optional) reCAPTCHA verification — wire in when keys are set.
 *   5. Send the email via Nodemailer.
 *
 * Rate limiting is intentionally not bundled here; add an upstream limiter
 * (Vercel Edge config, Upstash, etc.) where infrastructure decisions live.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

function jsonResponse(
  body: ContactApiResponse,
  init?: { status?: number },
): NextResponse {
  return NextResponse.json(body, init);
}

// 5 requests per IP per 10 minutes window.
const ratelimit =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: env.UPSTASH_REDIS_REST_URL,
          token: env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        analytics: true,
      })
    : null;

// Fallback in-memory rate limiter if Upstash is not configured.
const fallbackRateLimit = new Map<string, { count: number; expires: number }>();
function checkFallbackRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const record = fallbackRateLimit.get(ip);
  if (!record || record.expires < now) {
    fallbackRateLimit.set(ip, { count: 1, expires: now + windowMs });
    return false;
  }
  if (record.count >= 5) return true;
  record.count += 1;
  return false;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const requestId = crypto.randomUUID();
  const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
  
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(`ratelimit_contact_${ip}`);
      if (!success) {
        logger.warn("RateLimit Blocked request", { ip, requestId, type: "upstash" });
        return jsonResponse(
          { ok: false, error: "Too many requests. Please try again in a few minutes." },
          { status: 429 },
        );
      }
    } catch (err) {
      logger.error("Redis RateLimiter failed, falling back to memory", err, { ip, requestId });
      if (checkFallbackRateLimit(ip)) {
        return jsonResponse(
          { ok: false, error: "Too many requests. Please try again in a few minutes." }, 
          { status: 429 }
        );
      }
    }
  } else {
    if (process.env.NODE_ENV === "production") {
      logger.error("CRITICAL: Redis not configured in production. Failing safe to protect route.", { ip, requestId });
      return jsonResponse(
        { ok: false, error: "The contact service is currently under maintenance. Please try again shortly." },
        { status: 503 },
      );
    }
    
    // Local dev fallback
    if (checkFallbackRateLimit(ip)) {
      logger.warn("Fallback RateLimit Blocked request", { ip, requestId, type: "memory" });
      return jsonResponse(
        { ok: false, error: "Too many requests. Please try again in a few minutes." },
        { status: 429 },
      );
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(
      { ok: false, error: "Invalid request format." },
      { status: 400 },
    );
  }

  const result = validateContact(body);
  if (!result.ok) {
    return jsonResponse(
      { ok: false, error: "Validation failed.", fieldErrors: result.fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot — silently succeed if the hidden field was filled.
  if (result.value.website && result.value.website.length > 0) {
    logger.info("Honeypot triggered", { ip, requestId });
    return jsonResponse({ ok: true });
  }

  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Email sending timeout")), 8000)
    );
    
    await Promise.race([
      sendContactEmail({
        name: result.value.name,
        email: result.value.email,
        message: result.value.message,
      }),
      timeoutPromise
    ]);
    
    logger.info("Contact email sent successfully", { ip, requestId });
    return jsonResponse({ ok: true });
  } catch (err) {
    logger.error("sendContactEmail failed", err, { ip, requestId });
    return jsonResponse(
      { ok: false, error: "Unable to send your message right now. Please try again later or reach out via LinkedIn." },
      { status: 500 },
    );
  }
}
