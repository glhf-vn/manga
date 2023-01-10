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
      cardSize: {
        wide: "col-span-2",
        normal: "col-span-1",
      },
    },
    defaultVariants: {
      intent: "primary",
      hoverable: true,
      clickable: false,
      cardSize: "normal",
    },
  }
);

export interface CardProps
  extends VariantProps<typeof cardStyles>,
    HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  entry?: {
    name: string;
    price: string;
    publisher: string;
  };
}

export default function Card({
  intent,
  hoverable,
  clickable,
  cardSize,
  children,
  className,
  entry,
  ...props
}: CardProps): JSX.Element {
  return (
    <div
      className={cardStyles({
        intent,
        hoverable,
        clickable,
        cardSize,
        className,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
