import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import { google } from 'googleapis'
import styles from '../styles/styles.module.scss'
import banner from '../styles/banner.module.scss'
import Layout from '../components/layout'
import calendarsData from '../calendar.config'
import { useState, useMemo } from 'react'

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
  // get entry info for modal
  const [ currentManga, changeCurrentManga ] = useState({})

  const calendarSources = useMemo(() => {
    let sources = []

    sources = (calendarsData.map(publisher => {
      return {
        googleCalendarApiKey: googleApiKey,
        googleCalendarId: publisher.id,
        className: publisher.class,
        color: publisher.color,
      }
    }))

    return sources
  }, [googleApiKey])

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

  function scrollToToday() {
    document.querySelector('.fc-day-today').scrollIntoView({
      behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
    })
  }

  function openDetailedModal(eventInfo) {
    const url = eventInfo.event.url
    const eventId = url.slice(url.indexOf("eid=") + ("eid=").length)

    changeCurrentManga({
      id: eventId,
      name: eventInfo.event.title,
      date: eventInfo.event.start.toLocaleDateString('vi-VN'),
      description: eventInfo.event.extendedProps.description ?? "",
    })

    // Prevent Google Calendar URL to open
    eventInfo.jsEvent.preventDefault()

    // Open the modal
    UIkit.modal('#modal-detailed').show()
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
                  <img src={image} className={banner.image} objectfit="cover" alt={title} uk-img="target: !.uk-slideshow-items" />
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

      <a uk-tooltip="Xem lịch hôm nay" onClick={() => scrollToToday()} className={`${styles.today} uk-icon-button`} uk-icon="icon: location; ratio: 1.5"></a>

      <Layout title={pageTitle} description={pageDescription}>
        <div id="modal-detailed" uk-modal="true">
          <div className="uk-modal-dialog">
            <button className="uk-modal-close-default" type="button" uk-close="true"></button>
            <div className={styles.modal}>
              <div className={styles.image} id="modalImage" uk-lightbox="true">
                <object data={`https://res.cloudinary.com/glhfvn/image/upload/covers/${currentManga.id}.jpeg`} type="image/jpeg"></object>
              </div>
              <div className="uk-flex-1 uk-padding">
                <h3 className="uk-text-bold" id="title">{currentManga.name}</h3>
                <span><b>Phát hành</b> ngày {currentManga.date}</span>
                <p id="description" dangerouslySetInnerHTML={{ __html: currentManga.description }}></p>
                <p className="uk-margin-remove-bottom">
                  <span>Tìm kiếm nhanh:</span>{' '}
                  <a id="fahasa" href={`//www.fahasa.com/catalogsearch/result/?q=${currentManga.name}`} target="_blank" rel='noreferrer'>FAHASA</a>{' / '}
                  <a id="tiki" href={`//tiki.vn/search?q=${currentManga.name}`} target="_blank" rel='noreferrer'>Tiki</a>{' / '}
                  <a id="shopee" href={`//shopee.vn/search?keyword=${currentManga.name}`} target="_blank" rel='noreferrer'>Shopee</a>
                  </p>
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
                eventSources={calendarSources}
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
                      {calendarsData.map(publisher => {
                        return <>
                          <li>
                            <a href={`https://calendar.google.com/calendar/ical/${encodeURI(publisher.id)}/public/basic.ics`}>{publisher.name}</a>
                          </li>
                        </>
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <form className={styles.filter}>
                {calendarsData.map(publisher => {
                  return <>
                    <label className={styles.checkbox}>
                      <input type="checkbox" data-selector={publisher.class} defaultChecked onChange={toggleSources} />
                      <span style={{ backgroundColor: publisher.color, border: '1px solid ' + publisher.color }} className={`uk-label`}>{publisher.name}</span>
                    </label>
                  </>
                })}
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
                eventSources={calendarSources}
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
