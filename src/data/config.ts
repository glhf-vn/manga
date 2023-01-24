import type { DefaultSeoProps } from "next-seo";

export const seoConfig: DefaultSeoProps = {
  titleTemplate: "%s - mangaGLHF",
  defaultTitle: "mangaGLHF",
  themeColor: "#f8b60b",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "mangaGLHF",
  },
  twitter: {
    handle: "@catouberos",
    site: "@mangaGLHF",
    cardType: "summary_large_image",
  },
};

// Currency formatter
export const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

// Site list for listing.tsx
export const siteList = [
  {
    id: 0,
    name: "Tiki",
    value: "tiki",
    categories: [
      {
        id: 1084,
        name: "Manga",
      },
      {
        id: 7358,
        name: "Light-novel",
      },
    ],
  },
  {
    id: 1,
    name: "FAHASA",
    value: "fahasa",
    categories: [
      {
        id: 6718,
        name: "Manga",
      },
      {
        id: 5981,
        name: "Light-novel",
      },
    ],
  },
];
