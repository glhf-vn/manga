import type { HTMLProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva("m-2 rounded-lg py-0.5 px-1.5 text-xs text-zinc-800", {
  variants: {
    intent: {
      primary: "bg-zinc-200",
      success: "bg-green-200",
      error: "bg-red-200",
      caution: "bg-orange-200",
      info: "bg-amber-200",
      none: "",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export interface BadgeProps
  extends VariantProps<typeof buttonStyles>,
    HTMLProps<HTMLSpanElement> {
  children?: ReactNode;
}

export default function Badge({
  intent,
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span className={buttonStyles({ intent, className })} {...props}>
      {children}
    </span>
  );
}
