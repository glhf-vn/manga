import Footer from "@components/Footer";
import Navigation from "@components/Navigation";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
