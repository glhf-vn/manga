import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import { google } from 'googleapis'
import styles from '../styles/styles.module.scss'
import banner from '../styles/banner.module.scss'
import Image from 'next/image'
import Layout from '../components/layout'

const pageTitle = "Lịch phát hành Manga"
const pageDescription = "Xem lịch phát hành manga chưa bao giờ là dễ hơn, nay được tổng hợp từ nhiều NXB khác nhau!"

export async function getStaticProps() {
  const googleApiKey = process.env.GOOGLE_API_KEY

  const sheets = google.sheets({
    version: 'v4',
    auth: googleApiKey,
  });

  // Query
  async function getContent(content) {
    const range = content == 'info' ? 'info!B2' : 'info!B3'

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    })

    return response.data.values ?? false
  }

  const info = await getContent('info')

  async function getSheetContent(sheetNumber) {
    const range = sheetNumber + '!A2:F1000'

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    })

    return response.data.values
  }

  const covers = await getSheetContent('covers')

  // Result

  return {
    props: {
      info,
      covers,
      googleApiKey
    },
    revalidate: 7200, //revalidate every 2 hour
  }
}

export default function Home({ info, covers, googleApiKey }) {
  function shareModal() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href,
      })
        .then(() => console.log('Chia sẻ thành công'))
        .catch((error) => console.log('Lỗi khi chia sẻ', error));
    } else {
      UIkit.modal('#modal-share').show();
    }
  }

  function openDetailedModal(eventInfo) {
    const url = eventInfo.event.url
    const eventId = url.slice(url.indexOf("eid=") + ("eid=").length)

    function changeHTML(id, content) {
      document.getElementById(id).innerHTML = content
    }

    function changeHref(id, url) {
      document.getElementById(id).href = url
    }

    function changeImage(id, src) {
      var xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          document.getElementById(id).innerHTML = "<a href='https://res.cloudinary.com/glhfvn/image/upload/covers/" + src + ".jpeg'><img loading='lazy' src='https://res.cloudinary.com/glhfvn/image/upload/c_scale,f_auto,q_90,w_250/covers/" + src + "' srcset='https://res.cloudinary.com/glhfvn/image/upload/c_scale,f_auto,q_90,w_250/covers/" + src + " 250w, https://res.cloudinary.com/glhfvn/image/upload/c_scale,f_auto,q_90,w_400/covers/" + src + " 400w' /></a>"
        } else {
          document.getElementById(id).innerHTML = ""
        }
      };
      xhttp.open("GET", "https://res.cloudinary.com/glhfvn/image/upload/covers/" + src, true)
      xhttp.send()
    }

    // Prevent Google Calendar URL to open
    eventInfo.jsEvent.preventDefault();

    // Open the modal
    UIkit.modal('#modal-detailed').show();

    // Change the content of the modal
    changeHTML('title', eventInfo.event.title)
    changeHTML('date', eventInfo.event.start.getDate())
    changeHTML('month', eventInfo.event.start.getMonth() + 1)
    changeHTML('year', eventInfo.event.start.getFullYear())
    changeHTML('description', eventInfo.event.extendedProps.description ?? "")
    changeHref('fahasa', encodeURI('//www.fahasa.com/catalogsearch/result/?q=' + eventInfo.event.title))
    changeHref('tiki', encodeURI('//tiki.vn/search?q=' + eventInfo.event.title + '&category=1084'))
    changeHref('shopee', encodeURI('//shopee.vn/search?keyword=' + eventInfo.event.title))
    changeImage('modalImage', eventId)
  }

  function toggleSources(e) {
    let targetVariable = "--" + e.target.dataset.selector + '-display';
    let targetVariableList = "--" + e.target.dataset.selector + '-display-list';
    let root = document.querySelector(':root');

    if (e.target.checked == true) {
      root.style.setProperty(targetVariable, 'block');
      root.style.setProperty(targetVariableList, 'table-row');
    } else {
      root.style.setProperty(targetVariable, 'none');
      root.style.setProperty(targetVariableList, 'none');
    }
  }

  // hot fix: the table head keeps making the content disappear
  function injectHeader() {
    var calendarTable = document.getElementsByClassName('fc-scrollgrid-sync-table')[0];

    calendarTable.insertAdjacentHTML("afterbegin", `
    <thead class="table-head-fix">
      <tr style="height: 1%">
        <th>Thứ Hai</th>
        <th>Thứ Ba</th>
        <th>Thứ Tư</th>
        <th>Thứ Năm</th>
        <th>Thứ Sáu</th>
        <th>Thứ Bảy</th>
        <th>Chủ Nhật</th>
      </tr>
    </thead>
    `);
  }

  return (
    <>
      <div className={`${banner.banner} uk-position-relative uk-visible-toggle uk-light`} data-tabindex="-1" uk-slideshow="min-height: 300; max-height: 350; animation: pull; autoplay: true;">
        <ul className="uk-slideshow-items">
          {covers.map(cover => {
            const [helper, title, copyright, image, textColor, classname] = cover

            return (
              <>
                <li>
                  <img src={image} className={banner.image} objectFit="cover" alt={title} uk-img="target: !.uk-slideshow-items" />
                  <div className={`${banner.content} ${classname}`}>
                    <h2 className={`${banner.helper} uk-margin-remove`}>{helper}</h2>
                    <h1 className={banner.title} style={{ color: textColor }}>{title}</h1>
                    <span className={banner.copyright}>{copyright}</span>
                  </div>
                </li>
              </>
            )
          })}
        </ul>
        <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous="true" uk-slideshow-item="previous"></a>
        <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next="true" uk-slideshow-item="next"></a>
      </div>

      <Layout title={pageTitle} description={pageDescription}>
        <div id="modal-detailed" uk-modal="true">
          <div className="uk-modal-dialog">
            <button className="uk-modal-close-default" type="button" uk-close="true"></button>
            <div className={styles.modal}>
              <div className={styles.image} id="modalImage" uk-lightbox="true">
              </div>
              <div className="uk-flex-1 uk-padding">
                <h3 className="uk-text-bold" id="title">Headline</h3>
                <span><b>Phát hành</b> ngày <span id="date"></span>/<span id="month"></span>/<span id="year"></span></span>
                <p id="description"></p>
                <p className="uk-margin-remove-bottom"><a id="fahasa" target="_blank" rel='noreferrer'>FAHASA</a> / <a id="tiki" target="_blank" rel='noreferrer'>Tiki</a> / <a id="shopee" target="_blank" rel='noreferrer'>Shopee</a></p>
              </div>
            </div>
          </div>
        </div>

        <div id="modal-share" uk-modal="true">
          <div className="uk-modal-dialog uk-modal-body">
            <button className="uk-modal-close-default" type="button" uk-close="true"></button>
            <h2 className="uk-modal-title uk-text-bold">Chia sẻ</h2>
            <a id="facebook" href="https://www.facebook.com/sharer/sharer.php?u=https://manga.glhf.vn/" target="_parent"
              className="uk-button uk-button-secondary uk-margin-small-top uk-margin-small-right" style={{ background: '#1877f2', border: 'none' }}><span uk-icon="facebook"></span> Facebook</a>
            <a id="messenger" href="fb-messenger://share/?link=https%3A%2F%2Fmanga.glhf.vn" target="_parent"
              className="uk-button uk-button-secondary uk-margin-small-top uk-margin-small-right" style={{ background: 'linear-gradient(45deg, rgb(10, 124, 255), rgb(161, 14, 235), rgb(255, 82, 151), rgb(255, 108, 92))', border: 'none' }}>Messenger</a>
            <a id="twitter" href="//www.twitter.com/share?url=https://manga.glhf.vn/" target="_parent"
              className="uk-button uk-button-secondary uk-margin-small-top uk-margin-small-right" style={{ background: '#1da1f2', borderColor: '#1da1f2' }}><span uk-icon="twitter"></span> Twitter</a>
            <button id="url"
              className="uk-button uk-button-secondary uk-margin-small-top"><span uk-icon="link"></span> Đường dẫn</button>
          </div>
        </div>

        <div className={`uk-container ${styles.main}`}>
          <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}><span>Lịch phát hành manga định kỳ</span></h1>
          <div uk-alert="true">
            <a className="uk-alert-close" uk-close="true"></a>
            {info}
          </div>
          {/* <div uk-alert="true">
          <a className="uk-alert-close" uk-close="true"></a>
          {info}
        </div> */}
          <div className={styles.flex}>
            <div className={styles.flexBig}>
              <FullCalendar
                plugins={[dayGridPlugin, googleCalendarPlugin]}
                locale='vi'
                initialView='dayGridMonth'
                dayHeaders={false}
                aspectRatio={0}
                firstDay={1}
                scrollTime='09:00:00'
                viewClassNames="uk-margin-bottom"
                eventSources={[
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 'kim0qh2rt2k3pts7mhs9pdf84s@group.calendar.google.com',
                    className: 'kim',
                    color: '#e00024',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '55vfna92d05k21up0brcmsbq0o@group.calendar.google.com',
                    className: 'tre',
                    color: '#00aeef',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '7ht69okrmeph6snctucjn77vt0@group.calendar.google.com',
                    className: 'ipm',
                    color: '#01a14b',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 'fjevdjbpr2m9r5gooaigs3595s@group.calendar.google.com',
                    className: 'amak',
                    color: '#018763',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 'aammvnpdffcsq4oen8er6e6v10@group.calendar.google.com',
                    className: 'sky',
                    color: '#545454',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '5kjai0tie7kubu4nqls4j8e3uk@group.calendar.google.com',
                    className: 'tsuki',
                    color: '#f8cb10',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '5756jhpd8sj8doer4j39tsopl0@group.calendar.google.com',
                    className: 'uranix',
                    color: '#ED3822',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '1eajtmaus1kib4s8mgd3cp82ho@group.calendar.google.com',
                    className: 'wingsbooks',
                    color: '#00adef',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 'd4oi2g1csqm6d2a0e71j6fpjuo@group.calendar.google.com',
                    className: 'hikari',
                    color: '#f78027',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 's4m05q1nrpuq7p40ml2ct30jh8@group.calendar.google.com',
                    className: 'ichi',
                    color: '#F14435',
                  },
                ]}
                eventClick={openDetailedModal}
                viewDidMount={injectHeader}
              />
            </div>
            <div className={styles.flexSmall} id="sidebar">
              <div className={styles.social}>
                <button uk-tooltip="Chia sẻ" onClick={shareModal} id="share"
                  className="uk-button uk-button-default uk-margin-small-right">
                  <span uk-icon="push"></span>
                </button>
                <a uk-tooltip="Báo sai thông tin, web bị lỗi,..." href="mailto:catou@glhf.vn"
                  className="uk-button uk-button-default uk-margin-small-right">
                  <span uk-icon="warning"></span>
                </a>
                <div className="uk-inline">
                  <button uk-tooltip="Thêm lịch vào máy" className="uk-button uk-button-default" type="button"><span uk-icon="download"></span></button>
                  <div uk-dropdown="mode: click">
                    <ul className="uk-nav uk-dropdown-nav">
                      <li><a href="https://calendar.google.com/calendar/ical/kim0qh2rt2k3pts7mhs9pdf84s%40group.calendar.google.com/public/basic.ics">NXB Kim Đồng</a></li>
                      <li><a href="https://calendar.google.com/calendar/ical/55vfna92d05k21up0brcmsbq0o%40group.calendar.google.com/public/basic.ics">NXB Trẻ</a></li>
                      <li><a href="https://calendar.google.com/calendar/ical/7ht69okrmeph6snctucjn77vt0%40group.calendar.google.com/public/basic.ics">IPM</a></li>
                      <li><a href="https://calendar.google.com/calendar/ical/aammvnpdffcsq4oen8er6e6v10%40group.calendar.google.com/public/basic.ics">SkyComics</a></li>
                      <li><a href="https://calendar.google.com/calendar/ical/5kjai0tie7kubu4nqls4j8e3uk%40group.calendar.google.com/public/basic.ics">Tsuki LightNovel</a></li>
                      <li><a href="https://calendar.google.com/calendar/ical/fjevdjbpr2m9r5gooaigs3595s%40group.calendar.google.com/public/basic.ics">AMAK</a></li>
                      <li><a href="https://calendar.google.com/calendar/ical/d4oi2g1csqm6d2a0e71j6fpjuo%40group.calendar.google.com/public/basic.ics">Hikari</a></li>
                      <li><a href="https://calendar.google.com/calendar/ical/s4m05q1nrpuq7p40ml2ct30jh8%40group.calendar.google.com/public/basic.ics">Ichi Light Novel</a></li>
                      <li><a href="https://calendar.google.com/calendar/ical/5756jhpd8sj8doer4j39tsopl0%40group.calendar.google.com/public/basic.ics">Uranix</a></li>
                      <li><a href="https://calendar.google.com/calendar/ical/1eajtmaus1kib4s8mgd3cp82ho%40group.calendar.google.com/public/basic.ics">KĐ - Wings Books</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <form className={styles.filter}>
                <label className={styles.checkbox}>
                  <input type="checkbox" data-selector="kim" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.kim}`}>NXB Kim Đồng</span>
                </label>
                <label>
                  <input type="checkbox" data-selector="tre" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.tre}`}>NXB Trẻ</span>
                </label>
                <label>
                  <input type="checkbox" data-selector="ipm" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.ipm}`}>IPM</span>
                </label>
                <label>
                  <input type="checkbox" data-selector="sky" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.sky}`}>SkyComics</span>
                </label>
                <label>
                  <input type="checkbox" data-selector="tsuki" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.tsuki}`}>Tsuki LightNovel</span>
                </label>
                <label>
                  <input type="checkbox" data-selector="amak" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.amak}`}>AMAK</span>
                </label>
                <label>
                  <input type="checkbox" data-selector="uranix" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.uranix}`}>Uranix</span>
                </label>
                <label>
                  <input type="checkbox" data-selector="wingsbooks" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.wingsbooks}`}>KĐ - Wings Books</span>
                </label>
                <label>
                  <input type="checkbox" data-selector="hikari" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.hikari}`}>Hikari LightNovel</span>
                </label>
                <label>
                  <input type="checkbox" data-selector="ichi" defaultChecked onChange={toggleSources} />
                  <span className={`uk-label ${styles.ichi}`}>Ichi Light Novel</span>
                </label>
              </form>
              <FullCalendar
                plugins={[listPlugin, googleCalendarPlugin]}
                locale='vi'
                initialView='listMonth'
                height="80vh"
                titleFormat={{
                  year: 'numeric',
                  month: 'numeric'
                }}
                eventSources={[
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 'kim0qh2rt2k3pts7mhs9pdf84s@group.calendar.google.com',
                    className: 'kim-table',
                    color: '#e00024',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '55vfna92d05k21up0brcmsbq0o@group.calendar.google.com',
                    className: 'tre-table',
                    color: '#00aeef',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '7ht69okrmeph6snctucjn77vt0@group.calendar.google.com',
                    className: 'ipm-table',
                    color: '#01a14b',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 'fjevdjbpr2m9r5gooaigs3595s@group.calendar.google.com',
                    className: 'amak-table',
                    color: '#018763',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 'aammvnpdffcsq4oen8er6e6v10@group.calendar.google.com',
                    className: 'sky-table',
                    color: '#545454',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '5kjai0tie7kubu4nqls4j8e3uk@group.calendar.google.com',
                    className: 'tsuki-table',
                    color: '#f8cb10',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '5756jhpd8sj8doer4j39tsopl0@group.calendar.google.com',
                    className: 'uranix-table',
                    color: '#ED3822',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: '1eajtmaus1kib4s8mgd3cp82ho@group.calendar.google.com',
                    className: 'wingsbooks-table',
                    color: '#00adef',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 'd4oi2g1csqm6d2a0e71j6fpjuo@group.calendar.google.com',
                    className: 'hikari-table',
                    color: '#f78027',
                  },
                  {
                    googleCalendarApiKey: googleApiKey,
                    googleCalendarId: 's4m05q1nrpuq7p40ml2ct30jh8@group.calendar.google.com',
                    className: 'ichi-table',
                    color: '#f14435',
                  },
                ]}
                eventClick={openDetailedModal}
              />
              <div className={`uk-margin-top ${styles.hideOnMobile} ${styles.iframe}`}>
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FmangaGLHF&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="340" height="500" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
              </div>
              <div className={`uk-margin-top ${styles.hideOnMobile} ${styles.iframe}`}>
                <iframe src="https://discord.com/widget?id=966279292877168650&theme=dark" width="350" height="500" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
              </div>
            </div>
          </div>
        </div>
      </Layout >
    </>
  )
}
