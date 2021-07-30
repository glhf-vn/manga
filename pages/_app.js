import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/list/main.css'
import '../styles/app.scss'

// fix XMLHttpRequest error undefined of fullcalendar/google-calendar
global.XMLHttpRequest = require('xhr2');

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
