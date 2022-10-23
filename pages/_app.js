import "../styles/app.scss";

import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#fbea11" />
      <Component {...pageProps} />
    </>
  );
}
