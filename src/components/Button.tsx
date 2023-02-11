import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "h-fit cursor-pointer overflow-hidden rounded-xl py-2 px-3 inline-block transition-all duration-150 ease-linear",
  {
    variants: {
      intent: {
        primary: "bg-primary text-white hover:bg-primary/75",
        secondary:
          "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600",
        success: "bg-green-200 hover:bg-green-300",
        error: "bg-red-200 hover:bg-red-300",
        caution: "bg-orange-200 hover:bg-orange-200",
        none: "",
      },
      hoverable: {
        true: "hover:shadow-lg",
      },
    },
    defaultVariants: {
      intent: "none",
      hoverable: true,
    },
  }
);
const buttonContainerStyles = cva("flex justify-center items-center gap-3");

export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children?: ReactNode;
}

export default function Button({
  intent,
  hoverable,
  children,
  className,
  href,
  ...props
}: ButtonProps): JSX.Element {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={buttonStyles({ intent, hoverable, className })}
      >
        <div className={buttonContainerStyles()}>{children}</div>
      </a>
    );
  } else {
    return (
      <button
        className={buttonStyles({ intent, hoverable, className })}
        {...props}
      >
        <div className={buttonContainerStyles()}>{children}</div>
      </button>
    );
  }
}
