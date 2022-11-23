import Footer from "@components/Footer";
import Navigation from "@components/Navigation";

export default function Layout({ children }) {
  return (
    <div className="bg-zinc-50">
      <Navigation />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
