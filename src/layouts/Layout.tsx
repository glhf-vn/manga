import { ReactNode } from "react";

import Footer from "@components/Footer";
import Navigation from "@components/Navigation";
import { TopAlert } from "@components/TopAlert";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <TopAlert />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
