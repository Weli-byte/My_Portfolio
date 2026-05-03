"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Something went wrong!
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        An unexpected error has occurred. We&apos;ve been notified.
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Try again
      </button>
    </Container>
  );
}
