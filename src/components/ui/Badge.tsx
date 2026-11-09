import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "border-transparent bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900",
    secondary:
      "border-transparent bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
    outline:
      "border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200",
    success:
      "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

