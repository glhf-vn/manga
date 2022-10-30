import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLProps, type ReactNode } from "react";

const buttonStyles = cva(
  "h-fit cursor-pointer overflow-hidden rounded-2xl py-2 px-3 inline-block",
  {
    variants: {
      intent: {
        primary: "bg-primary text-white",
        secondary: "bg-zinc-200",
        success: "bg-green-200",
        error: "bg-red-200",
        caution: "bg-orange-200",
      },
      hoverable: {
        true: "hover:shadow-lg transition-shadow duration-150 ease-linear",
        false: "",
      },
    },
    defaultVariants: {
      intent: "secondary",
      hoverable: true,
    },
  }
);

export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

export default function Card({
  intent,
  hoverable,
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <div className={buttonStyles({ intent, hoverable })} {...props}>
      {children}
    </div>
  );
}
