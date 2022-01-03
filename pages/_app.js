import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/list/main.css'
import '../styles/app.scss'
import '../styles/nprogress.css'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// fix XMLHttpRequest error undefined of fullcalendar/google-calendar
global.XMLHttpRequest = require('xhr2');

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <Component {...pageProps} />
  )
}
