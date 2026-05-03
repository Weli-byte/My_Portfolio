/**
 * Runtime environment variable validation.
 * Ensures required variables are present at build and runtime.
 * Avoids exposing sensitive server variables to the client.
 */

// Only read process.env on the server.
const isServer = typeof window === "undefined";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    if (isServer) {
      throw new Error(`CRITICAL: Missing required environment variable: ${name}`);
    } else {
      console.warn(`Missing required environment variable: ${name}`);
      return "";
    }
  }
  return value;
}

export const env = {
  // Public variables (exposed to client)
  NEXT_PUBLIC_SITE_URL: requireEnv("NEXT_PUBLIC_SITE_URL"),
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || "",
  NEXT_PUBLIC_HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID || "",

  // Server variables (safely extracted only on server)
  get SMTP_HOST() { return isServer ? requireEnv("SMTP_HOST") : ""; },
  get SMTP_PORT() { return isServer ? parseInt(process.env.SMTP_PORT || "587", 10) : 587; },
  get SMTP_SECURE() { return isServer ? process.env.SMTP_SECURE === "true" : false; },
  get SMTP_USER() { return isServer ? requireEnv("SMTP_USER") : ""; },
  get SMTP_PASS() { return isServer ? requireEnv("SMTP_PASS") : ""; },
  get SMTP_FROM() { return isServer ? process.env.SMTP_FROM || requireEnv("SMTP_USER") : ""; },
  get CONTACT_TO() { return isServer ? requireEnv("CONTACT_TO") : ""; },
  get UPSTASH_REDIS_REST_URL() { return isServer ? process.env.UPSTASH_REDIS_REST_URL || "" : ""; },
  get UPSTASH_REDIS_REST_TOKEN() { return isServer ? process.env.UPSTASH_REDIS_REST_TOKEN || "" : ""; },
};
