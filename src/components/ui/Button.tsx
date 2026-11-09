import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, external, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg cursor-pointer";

    const variantStyles = {
      primary:
        "bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 shadow-lg shadow-amber-500/15 active:scale-[0.98]",
      secondary:
        "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/70 active:scale-[0.98]",
      outline:
        "border border-zinc-700/90 bg-zinc-950/40 text-zinc-300 hover:border-amber-400/60 hover:text-amber-300 active:scale-[0.98]",
      ghost:
        "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
