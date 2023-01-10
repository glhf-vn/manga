import type { AppProps } from "next/app";

import { DateTime, Settings } from "luxon";

import NextNProgress from "nextjs-progressbar";
import { DefaultSeo } from "next-seo";
import { Analytics } from "@vercel/analytics/react";

import "@styles/app.scss";

import { seoConfig } from "@data/config";

export default function App({ Component, pageProps }: AppProps) {
  Settings.defaultLocale = "vi";

  return (
    <div>
      <DefaultSeo
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            rel: "icon",
            href: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
            sizes: "180x180",
          },
        ]}
        {...seoConfig}
      />
      <NextNProgress color="#f8b60b" />
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
