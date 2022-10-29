import { Kanit } from "@next/font/google";
import { type ReactNode } from "react";

const kanit = Kanit({
  weight: "700",
});

const containerStyles =
  "mb-12 flex h-96 items-center justify-center bg-zinc-100";
const titleStyles = `container px-6 text-center text-4xl ${kanit.className}`;

export interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>{children}</h1>
    </div>
  );
}
