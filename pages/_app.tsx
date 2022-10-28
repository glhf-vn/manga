import "../styles/app.scss";
import NextNProgress from "nextjs-progressbar";
import { Inter } from "@next/font/google";

const inter = Inter();

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <NextNProgress color="#fbea11" />
      <Component {...pageProps} />
    </div>
  );
}
