import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import styles from '../styles/styles.module.scss'
import Layout from '../components/layout'

export default function Home() {
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
  }

  function changeHTML(id, content) {
    document.getElementById(id).innerHTML = content;
  }

  function toggleSources(e) {
    let targetVariable = "--" + e.target.dataset.selector + '-display';
    let root = document.querySelector(':root');

    if(e.target.checked == true) {
      root.style.setProperty(targetVariable, 'block');
    } else {
      root.style.setProperty(targetVariable, 'none');
    }
  }

  return (
    <Layout>
      <div id="modal-detailed" uk-modal="true">
        <div className="uk-modal-dialog uk-modal-body">
          <button className="uk-modal-close-default" type="button" uk-close="true"></button>
          <h2 className="uk-modal-title uk-text-bold" id="title"></h2>
          <span><b>Phát hành</b> ngày <span id="date"></span> tháng <span id="month"></span> năm <span
            id="year"></span></span>
          <p id="description"></p>
        </div>
      </div>

      <div id="modal-share" uk-modal="true">
        <div className="uk-modal-dialog uk-modal-body">
          <button className="uk-modal-close-default" type="button" uk-close="true"></button>
          <h2 className="uk-modal-title uk-text-bold">Chia sẻ</h2>
          <a id="facebook" href="https://www.facebook.com/sharer/sharer.php?u=https://manga.glhf.vn/" target="_parent"
            className="uk-button uk-button-secondary" style={{ background: '#1877f2', border: 'none' }}><span uk-icon="facebook"></span> Facebook</a>
          <a id="messenger" href="fb-messenger://share/?link=https%3A%2F%2Fmanga.glhf.vn" target="_parent"
            className="uk-button uk-button-secondary" style={{ background: 'linear-gradient(45deg, rgb(10, 124, 255), rgb(161, 14, 235), rgb(255, 82, 151), rgb(255, 108, 92))', border: 'none' }}>Messenger</a>
          <a id="twitter" href="//www.twitter.com/share?url=https://manga.glhf.vn/" target="_parent"
            className="uk-button uk-button-secondary" style={{ background: '#1da1f2', borderColor: '#1da1f2' }}><span uk-icon="twitter"></span> Twitter</a>
          <button id="url"
            className="uk-button uk-button-secondary"><span uk-icon="link"></span> Đường dẫn</button>
        </div>
      </div>

      <div className={`uk-container ${styles.main}`}>
        <h1 className={`uk-heading-line ${styles.title}`}><span>Lịch phát hành manga định kỳ</span></h1>
        <div uk-alert="true">
          <a className="uk-alert-close" uk-close="true"></a>
          Bạn có thể ấn vào tên truyện để xem chi tiết, đầy đủ hơn. Bên cạnh đó, cũng có thể ấn vào tên NXB để lọc.{' '}
          <b>Cập nhật: đã thêm nút phóng to/thu nhỏ.</b>
        </div>

        <div className={styles.flex}>
          <div className={styles.flexBig}>
            <FullCalendar
              plugins={[dayGridPlugin, googleCalendarPlugin]}
              locale='vi'
              initialView='dayGridMonth'
              dayHeaderFormat={{
                weekday: 'long',
              }}
              eventSources={[
                {
                  googleCalendarApiKey: 'AIzaSyAx2Q1ZwT5ujAiRRWmnZD_Ui-91-R-plAo',
                  googleCalendarId: '2ahhvdl7pi34oldst8vi5dl8g8@group.calendar.google.com',
                  id: 'nxbKimDong',
                  className: 'kim',
                  color: '#e00024',
                },
              ]}
              eventClick={openDetailedModal}
            />
          </div>
          <div className={styles.flexSmall} id="sidebar">
            <div className={styles.social}>
              <button uk-tooltip="Chia sẻ" onClick={shareModal} id="share"
                className="uk-button uk-button-default uk-margin-small-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
              </button>
              <a uk-tooltip="Báo sai thông tin, web bị lỗi,..." href="mailto:khoanguyen.do@outlook.com"
                className="uk-button uk-button-default">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                </svg>
                <span>Báo cáo</span>
              </a>
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
                <span className={`uk-label ${styles.wingsbook}`}>KĐ - Wings Books</span>
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
                  googleCalendarApiKey: 'AIzaSyAx2Q1ZwT5ujAiRRWmnZD_Ui-91-R-plAo',
                  googleCalendarId: '2ahhvdl7pi34oldst8vi5dl8g8@group.calendar.google.com',
                  id: 'nxbKimDong',
                  className: 'kim',
                  color: '#e00024',
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
