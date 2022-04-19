import styles from '../styles/styles.module.scss'
import Layout from '../components/layout'

const pageTitle = "OSS Licences"
const pageDescription = "Infomations on OSS being used by manga.GLHF.vn"


export default function Licenses() {
    return (
        <Layout title={pageTitle} description={pageDescription}>
            <div className={`uk-container ${styles.main}`}>
                <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}><span>Licenses</span></h1>
                <div>
                    This webpage was made possible using both open-source software and free-to-use services:<br></br>
                    <ol>
                        <li><a href="https://anilist.co/" target="_blank">AniList</a> API (Terms of Use can be found <a href="https://anilist.gitbook.io/anilist-apiv2-docs/" target="_blank">here</a>)</li>
                        <li><a href="https://fullcalendar.io/" target="_blank">FullCalendar</a> (under <a href="https://opensource.org/licenses/MIT" target="_blank">MIT license</a>)</li>
                        <li><a href="https://getuikit.com/" target="_blank">UIkit</a></li>
                        <li><a href="https://calendar.google.com/" target="_blank">Google Calendar</a> & <a href="https://sheets.google.com/" target="_blank">Google Sheets</a> API (Terms of Service can be found <a href="https://developers.google.com/workspace/terms" target="_blank">here</a>)</li>
                    </ol>
                    <br></br>
                    This webpage was made to be totally free-of-charge, and totally respect your privacy. No ads were placed, no tracking scripts were add (with exclusion of ones included in Facebook's Page iframe), with the source code being made publicly on <a href="http://github.com/catouberos/mangaGLHF" target="_blank">GitHub</a>.
                    <br></br><br></br>
                    Any inqueries please contact <a href="mailto:konnichiwa@glhf.vn">konnichiwa@glhf.vn</a> or GLHF's Facebook page.
                </div>
            </div>
        </Layout >
    )
}
