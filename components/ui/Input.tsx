import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-xl border-2 px-4 py-3 transition focus:outline-none",
          error
            ? "border-error bg-error/5"
            : "border-gray-300 focus:border-primary",
          className,
        )}
        {...rest}
      />
      {hint && !error && (
        <p className="mt-1 text-xs text-gray-500">{hint}</p>
      )}
      {error && <p className="mt-1 text-xs font-bold text-error">{error}</p>}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...rest
}: TextareaProps) {
  const inputId = id ?? rest.name;
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={4}
        className={cn(
          "w-full rounded-xl border-2 px-4 py-3 transition focus:outline-none",
          error
            ? "border-error bg-error/5"
            : "border-gray-300 focus:border-primary",
          className,
        )}
        {...rest}
      />
      {error && <p className="mt-1 text-xs font-bold text-error">{error}</p>}
    </div>
  );
}
