import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";
import "../styles/app.scss";

import NextNProgress from "nextjs-progressbar";

// fix XMLHttpRequest error undefined of fullcalendar/google-calendar
global.XMLHttpRequest = require("xhr2");

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
}
