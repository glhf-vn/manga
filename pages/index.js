import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import { google } from 'googleapis'
import Head from 'next/head'
import styles from '../styles/styles.module.scss'
import Layout from '../components/layout'

const pageTitle = "Lịch phát hành Manga"
const pageDescription = "Xem lịch phát hành manga chưa bao giờ là dễ hơn, nay được tổng hợp từ nhiều NXB khác nhau!"

export async function getStaticProps() {

  const sheets = google.sheets({
    version: 'v4',
    auth: process.env.GOOGLE_API_KEY,
  });

  // Query
  async function getContent(content) {
    const range = content == 'update' ? 'info!B2' : 'info!B3';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    return response.data.values ?? false;
  }

  const update = await getContent('update');
  const info = await getContent('info');

  // Result

  return {
    props: {
      update,
      info
    },
    revalidate: 7200, //revalidate every 2 hour
  }
}

export default function Home({ update, info }) {

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

  function openReportModal() {
    UIkit.modal('#modal-report').show();
  }

  function openDetailedModal(eventInfo) {
    // Prevent Google Calendar URL to open
    eventInfo.jsEvent.preventDefault();

    // Open the modal
    UIkit.modal('#modal-detailed').show();

    // Change the content of the modal
    changeHTML('title', eventInfo.event.title);
    changeHTML('date', eventInfo.event.start.getDate());
    changeHTML('month', eventInfo.event.start.getMonth() + 1);
    changeHTML('year', eventInfo.event.start.getFullYear());
    changeHTML('description', eventInfo.event.extendedProps.description);
    changeHref('fahasa', encodeURI('//www.fahasa.com/catalogsearch/result/?q=' + eventInfo.event.title));
    changeHref('tiki', encodeURI('//tiki.vn/search?q=' + eventInfo.event.title + '&category=1084'));
    changeHref('shopee', encodeURI('//shopee.vn/search?keyword=' + eventInfo.event.title))
  }

  function changeHTML(id, content) {
    document.getElementById(id).innerHTML = content;
  }

  function changeHref(id, url) {
    document.getElementById(id).href = url;
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

  function showAlert(content) {
    if (content) {
      return (
        <div uk-alert="true">
          <a className="uk-alert-close" uk-close="true"></a>
          {content}
        </div>
      )
    }
  }

  // hot fix: the table head keeps making the content disappear
  function injectHeader() {
    var calendarTable = document.getElementsByClassName('fc-scrollgrid-sync-table')[0];

    calendarTable.insertAdjacentHTML("afterbegin", `
    <thead class="table-head-fix">
      <tr>
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
    <Layout>
      <Head>
        <title>{pageTitle + " / manga.GLHF.vn"}</title>
        <meta property="og:title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta property="og:description" content={pageDescription} />
      </Head>
      <div id="modal-detailed" uk-modal="true">
        <div className="uk-modal-dialog uk-modal-body">
          <button className="uk-modal-close-default" type="button" uk-close="true"></button>
          <h2 className="uk-modal-title uk-text-bold" id="title"></h2>
          <span><b>Phát hành</b> ngày <span id="date"></span> tháng <span id="month"></span> năm <span
            id="year"></span></span>
          <p id="description"></p>
          <p><strong>Tìm nhanh</strong>: <a id="fahasa" target="_blank" rel='noreferrer'>FAHASA</a> / <a id="tiki" target="_blank" rel='noreferrer'>Tiki</a> / <a id="shopee" target="_blank" rel='noreferrer'>Shopee</a></p>
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
        {showAlert(update)}
        {showAlert(info)}
        <div className={styles.flex}>
          <div className={styles.flexBig}>
            <FullCalendar
              plugins={[dayGridPlugin, googleCalendarPlugin]}
              locale='vi'
              initialView='dayGridMonth'
              titleFormat={{
                year: 'numeric',
                month: 'numeric'
              }}
              dayHeaders={false}
              aspectRatio={1.2}
              firstDay={1}
              viewClassNames="uk-margin-bottom"
              eventSources={[
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: '2ahhvdl7pi34oldst8vi5dl8g8@group.calendar.google.com',
                  className: 'kim',
                  color: '#e00024',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: '95o6f5p1pd6jofhului3is62t8@group.calendar.google.com',
                  className: 'tre',
                  color: '#00aeef',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: 'cgrvn8e7fplp686spfr5mgko8o@group.calendar.google.com',
                  className: 'ipm',
                  color: '#01a14b',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: 'bfm6ju43bch0jjkuuac0739f5c@group.calendar.google.com',
                  className: 'amak',
                  color: '#018763',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: 'k2nu1ihpbo8l17abfdakn8tkgg@group.calendar.google.com',
                  className: 'sky',
                  color: '#545454',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: '3bi08q64q89jujjq64fimfdpv0@group.calendar.google.com',
                  className: 'tsuki',
                  color: '#f8cb10',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: '654qd280st7bkeofugju8du9p8@group.calendar.google.com',
                  className: 'uranix',
                  color: '#ED3822',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: 'iu1k210lirlffs3uesasnrkhcg@group.calendar.google.com',
                  className: 'wingsbooks',
                  color: '#00adef',
                },
              ]}
              // eventClick={openDetailedModal}
              viewDidMount={injectHeader}
            />
          </div>
          <div className={styles.flexSmall} id="sidebar">
            <div className={styles.social}>
              <button uk-tooltip="Chia sẻ" onClick={shareModal} id="share"
                className="uk-button uk-button-default uk-margin-small-right">
                <span uk-icon="push"></span>
              </button>
              <button uk-tooltip="Báo sai thông tin, web bị lỗi,..." onClick={openReportModal}
                className="uk-button uk-button-default">
                <span uk-icon="warning"></span>{' '}
                <span>Báo cáo</span>
              </button>
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
            </form>
            <FullCalendar
              plugins={[listPlugin, googleCalendarPlugin]}
              locale='vi'
              initialView='listMonth'
              headerToolbar='false'
              eventSources={[
                {
                  // Kim Dong
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: '2ahhvdl7pi34oldst8vi5dl8g8@group.calendar.google.com',
                  className: 'kim-table',
                  color: '#e00024',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: '95o6f5p1pd6jofhului3is62t8@group.calendar.google.com',
                  className: 'tre-table',
                  color: '#00aeef',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: 'cgrvn8e7fplp686spfr5mgko8o@group.calendar.google.com',
                  className: 'ipm-table',
                  color: '#01a14b',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: 'bfm6ju43bch0jjkuuac0739f5c@group.calendar.google.com',
                  className: 'amak-table',
                  color: '#018763',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: 'k2nu1ihpbo8l17abfdakn8tkgg@group.calendar.google.com',
                  className: 'sky-table',
                  color: '#545454',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: '3bi08q64q89jujjq64fimfdpv0@group.calendar.google.com',
                  className: 'tsuki-table',
                  color: '#f8cb10',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: '654qd280st7bkeofugju8du9p8@group.calendar.google.com',
                  className: 'uranix-table',
                  color: '#ED3822',
                },
                {
                  googleCalendarApiKey: "AIzaSyABomKw9YzSXANNoApsZje0CWi6Mbr-Xgc",
                  googleCalendarId: 'iu1k210lirlffs3uesasnrkhcg@group.calendar.google.com',
                  className: 'wingsbooks-table',
                  color: '#00adef',
                },
              ]}
              eventClick={openDetailedModal}
            />
          </div>
        </div>
      </div>
    </Layout >
  )
}
