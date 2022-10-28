import Footer from "./Footer";
import Header from "./Header";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
});

export default function Layout({ children }) {
  return (
    <div className={inter.variable}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
