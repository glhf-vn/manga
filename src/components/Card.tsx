import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLProps, type ReactNode } from "react";

const cardStyles = cva(
  "h-fit cursor-pointer overflow-hidden rounded-2xl shadow-md bg-zinc-100",
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
        false: "",
      },
    },
    defaultVariants: {
      intent: "primary",
      hoverable: true,
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
  children,
  ...props
}: CardProps): JSX.Element {
  return (
    <div className={cardStyles({ intent, hoverable })} {...props}>
      {children}
    </div>
  );
}
