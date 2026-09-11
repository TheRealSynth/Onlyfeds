"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-bright shadow-[0_0_0_1px_rgba(232,177,77,0.4)] hover:shadow-[0_0_24px_rgba(232,177,77,0.35)]",
  secondary: "bg-white/5 text-ink-fg border border-panel-border hover:bg-white/10 hover:border-white/20",
  ghost: "text-ink-fg hover:bg-white/5",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  onClick,
  type = "button",
}: CommonProps & { href?: string; type?: "button" | "submit" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-150 min-h-[44px]";
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
