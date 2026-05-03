"use client";

import {
  useId,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { Button } from "@/components/ui/Button";
import {
  validateContact,
  type ContactApiResponse,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type FormStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const INITIAL_VALUES: ContactPayload = {
  name: "",
  email: "",
  message: "",
  website: "",
};

/**
 * Contact form. Validates locally on submit, posts to /api/contact, and
 * surfaces server-side field errors when present. Honeypot field is rendered
 * but visually hidden + aria-hidden so real users never see or focus it.
 */
export function ContactForm() {
  const baseId = useId();
  const [values, setValues] = useState<ContactPayload>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });
  const [mountedTime] = useState<number>(Date.now());

  const isLoading = status.state === "loading";
  const isSuccess = status.state === "success";

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof ContactPayload]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ContactPayload];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;

    // Anti-bot: Humans take more than 2 seconds to read, fill, and submit a form.
    if (Date.now() - mountedTime < 2000) {
      setStatus({
        state: "error",
        message: "You submitted the form too quickly. Please take your time.",
      });
      return;
    }

    const result = validateContact(values);
    if (!result.ok) {
      setFieldErrors(result.fieldErrors);
      setStatus({
        state: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    setFieldErrors({});
    setStatus({ state: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });

      const data = (await res.json()) as ContactApiResponse;

      if (!res.ok || !data.ok) {
        if (!data.ok && data.fieldErrors) setFieldErrors(data.fieldErrors);
        setStatus({
          state: "error",
          message:
            (!data.ok && data.error) ||
            "Something went wrong. Please try again.",
        });
        return;
      }

      setValues(INITIAL_VALUES);
      setStatus({
        state: "success",
        message: "Thanks — your message is on its way. I'll reply soon.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center" aria-live="polite">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">Message Sent</h3>
          <p className="mt-2 text-sm text-gray-400">{status.message}</p>
        </div>
        <button
          onClick={() => { setStatus({ state: "idle" }); setValues(INITIAL_VALUES); }}
          className="mt-4 rounded-lg border border-white/10 bg-white/[0.05] px-5 py-2 text-sm font-semibold text-gray-300 hover:border-amber-500/30 hover:text-amber-400 transition-all"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-describedby={`${baseId}-status`}
    >
      <Field
        id={`${baseId}-name`}
        name="name"
        label="Name"
        autoComplete="name"
        value={values.name}
        onChange={handleChange}
        error={fieldErrors.name}
        disabled={isLoading}
        required
      />

      <Field
        id={`${baseId}-email`}
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        error={fieldErrors.email}
        disabled={isLoading}
        required
      />

      <Field
        id={`${baseId}-message`}
        name="message"
        label="Message"
        as="textarea"
        rows={6}
        value={values.message}
        onChange={handleChange}
        error={fieldErrors.message}
        disabled={isLoading}
        required
      />

      {/* Honeypot — bots fill it; humans don't see or focus it. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px]">
        <label htmlFor={`${baseId}-website`}>Website (leave empty)</label>
        <input
          id={`${baseId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Sending…" : "Send message"}
        </button>

        <p
          id={`${baseId}-status`}
          aria-live="polite"
          className={cn(
            "text-sm",
            status.state === "error" && "text-red-400",
            status.state === "loading" && "text-gray-400",
          )}
        >
          {status.state === "error" && status.message}
          {status.state === "loading" && "Sending your message…"}
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Local Field primitive — keeps the form file self-contained.                 */
/* -------------------------------------------------------------------------- */

type FieldProps = {
  id: string;
  name: keyof ContactPayload;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  autoComplete?: string;
} & ({ as?: "input" } | { as: "textarea"; rows?: number });

function Field(props: FieldProps) {
  const { id, name, label, value, onChange, error, disabled, required } =
    props;
  const errorId = `${id}-error`;

  const sharedClasses = cn(
    "w-full rounded-lg border bg-white/[0.04] px-3 py-2.5 text-sm text-gray-200",
    "placeholder:text-gray-600",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50",
    "disabled:cursor-not-allowed disabled:opacity-60",
    error
      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
      : "border-white/10 focus:border-amber-500/50",
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-300"
      >
        {label}
        {required && <span className="ml-0.5 text-amber-400">*</span>}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={props.rows ?? 5}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(sharedClasses, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={props.type ?? "text"}
          autoComplete={props.autoComplete}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={sharedClasses}
        />
      )}

      {error && (
        <p
          id={errorId}
          className="text-xs font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
