import { type ReactNode } from "react";

const containerStyles =
  "mb-12 flex h-96 items-center justify-center bg-zinc-100 dark:bg-zinc-900 shadow-[inset_0_0_1rem_0_rgba(0,0,0,0.1)]";
const titleStyles = `container px-6 text-center text-4xl font-kanit font-bold`;

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
