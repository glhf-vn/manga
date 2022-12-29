import type { HTMLProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "h-fit cursor-pointer overflow-hidden rounded-xl py-2 px-3 inline-block",
  {
    variants: {
      intent: {
        primary: "bg-primary text-white",
        secondary: "bg-zinc-200 dark:bg-zinc-700",
        success: "bg-green-200",
        error: "bg-red-200",
        caution: "bg-orange-200",
        none: "",
      },
      hoverable: {
        true: "hover:shadow-lg transition-shadow duration-150 ease-linear",
        false: "hover:bg-zinc-300 transition-colors duration-150 ease-linear",
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
    HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  href?: string;
}

export default function Card({
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
      <div
        className={buttonStyles({ intent, hoverable, className })}
        {...props}
      >
        <div className={buttonContainerStyles()}>{children}</div>
      </div>
    );
  }
}
