import { useId } from "react";
import clsx from "clsx";

interface FieldProps {
  className?: string;
  children: (id: string) => React.ReactNode;
}

export function Field({ className, children }: FieldProps) {
  const id = useId();

  return <div className={className}>{children(id)}</div>;
}

export function Label({ ...props }: JSX.IntrinsicElements["label"]) {
  return (
    <label
      {...props}
      className={clsx("block text-sm font-semibold", props.className)}
    />
  );
}

export function Input({ ...props }: JSX.IntrinsicElements["input"]) {
  return (
    <input
      {...props}
      className={clsx(
        "mt-1 w-full rounded-md border-0 px-3 py-2 text-sm shadow-sm outline-none ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-300",
        props.className,
      )}
    />
  );
}