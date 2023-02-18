import type { HTMLProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const cardStyles = cva(
  "rounded-2xl h-fit shadow-md bg-zinc-100 overflow-hidden relative dark:bg-zinc-700",
  {
    variants: {
      intent: {
        primary: "",
        success: "shadow-green-200",
        error: "shadow-red-200",
        caution: "shadow-orange-200",
      },
      hoverable: {
        true: "hover:shadow-lg transition-shadow duration-150 ease-linear",
      },
      clickable: {
        true: "cursor-pointer",
      },
    },
    defaultVariants: {
      intent: "primary",
      hoverable: true,
      clickable: false,
    },
  }
);

export interface CardProps
  extends VariantProps<typeof cardStyles>,
    HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

export default function Card({
  intent,
  hoverable,
  clickable,
  children,
  className,
  ...props
}: CardProps): JSX.Element {
  return (
    <div
      className={cardStyles({
        intent,
        hoverable,
        clickable,
        className,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
