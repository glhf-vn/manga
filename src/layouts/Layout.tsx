import { ReactNode } from "react";

import Footer from "@components/Footer";
import Navigation from "@components/Navigation";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-50">
      <Navigation />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
