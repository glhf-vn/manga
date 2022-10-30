import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLProps, type ReactNode } from "react";

const cardStyles = cva(
  "h-fit overflow-hidden rounded-2xl shadow-md bg-zinc-100",
  {
    variants: {
      intent: {
        primary: "shadow-zinc-200",
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
  ...props
}: CardProps): JSX.Element {
  return (
    <div className={cardStyles({ intent, hoverable, clickable })} {...props}>
      {children}
    </div>
  );
}
