/**
 * Lightweight, structured logger for production.
 * Ensures consistent log formats for easy ingestion by Datadog, Vercel, or AWS CloudWatch.
 */

const isProd = process.env.NODE_ENV === "production";

type LogLevel = "info" | "warn" | "error";

function formatMessage(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  if (!isProd) {
    return [message, meta ? meta : ""];
  }
  return [JSON.stringify({
    level,
    timestamp: new Date().toISOString(),
    message,
    ...meta
  })];
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => 
    console.log(...formatMessage("info", message, meta)),
  
  warn: (message: string, meta?: Record<string, unknown>) => 
    console.warn(...formatMessage("warn", message, meta)),
  
  error: (message: string, err?: unknown, meta?: Record<string, unknown>) => {
    const errorDetails = err instanceof Error 
      ? { errorMessage: err.message, stack: err.stack, name: err.name }
      : { rawError: err };
    console.error(...formatMessage("error", message, { ...meta, ...errorDetails }));
  }
};
