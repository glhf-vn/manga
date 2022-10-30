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
  // TODO: favicon
  // additionalLinkTags={[
  //   {
  //     rel: 'icon',
  //     href: 'https://www.test.ie/favicon.ico',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     href: 'https://www.test.ie/touch-icon-ipad.jpg',
  //     sizes: '76x76'
  //   },
  //   {
  //     rel: 'manifest',
  //     href: '/manifest.json'
  //   },
  //   {
  //     rel: 'preload',
  //     href: 'https://www.test.ie/font/sample-font.woof2',
  //     as: 'font',
  //     type: 'font/woff2',
  //     crossOrigin: 'anonymous'
  //   }
  // ]}
};

export default config;
