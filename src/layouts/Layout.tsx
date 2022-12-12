import { ReactNode } from "react";

import Footer from "@components/Footer";
import Navigation from "@components/Navigation";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
