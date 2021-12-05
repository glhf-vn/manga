import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/list/main.css'
import '../styles/app.scss'
import ReactGA from 'react-ga'
import { useEffect } from 'react'

// fix XMLHttpRequest error undefined of fullcalendar/google-calendar
global.XMLHttpRequest = require('xhr2');

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if(process.env.GOOGLE_ANALYTICS_ID && process.env.NODE_ENV === "production") { // google analytics
      ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  })

  return <Component {...pageProps} />
}

export default MyApp
