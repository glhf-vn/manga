import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "%s - mangaGLHF",
  defaultTitle: "mangaGLHF",
  themeColor: "#f8b60b",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://manga.glhf.vn/",
    siteName: "mangaGLHF",
  },
  twitter: {
    handle: "@catouberos",
    site: "@mangaGLHF",
    cardType: "summary_large_image",
  },
};

export default config;
