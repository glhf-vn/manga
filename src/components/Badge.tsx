import { cva, type VariantProps } from "class-variance-authority";
import { HTMLProps, type ReactNode } from "react";

const buttonStyles = cva("m-2 rounded-lg py-0.5 px-1.5 text-xs", {
  variants: {
    intent: {
      primary: "bg-zinc-200",
      success: "bg-green-200",
      error: "bg-red-200",
      caution: "bg-orange-200",
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

export default function Badge({ intent, children, ...props }: BadgeProps) {
  return (
    <span className={buttonStyles({ intent })} {...props}>
      {children}
    </span>
  );
}
