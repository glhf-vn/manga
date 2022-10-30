import "../styles/app.scss";
import NextNProgress from "nextjs-progressbar";
import { DefaultSeo } from "next-seo";
import { Inter } from "@next/font/google";

const inter = Inter();

import SEO from "@data/next-seo";

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <DefaultSeo {...SEO} />
      <NextNProgress color="#fbea11" />
      <Component {...pageProps} />
    </div>
  );
}
