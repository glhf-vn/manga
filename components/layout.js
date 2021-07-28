import Head from 'next/head'
import Link from 'next/link'
import banner from './banner.module.scss'
import footer from './footer.module.scss'

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <script src="https://cdn.jsdelivr.net/npm/uikit@3.7.1/dist/js/uikit.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/uikit@3.7.1/dist/js/uikit-icons.min.js"></script>
            </Head>
            <div className={`${banner.banner} uk-position-relative uk-visible-toggle uk-light`} data-tabindex="-1" uk-slideshow="min-height: 250; max-height: 280; animation: pull; autoplay: true;">
                <ul className="uk-slideshow-items">
                    <li>
                        <img src="/img/banner2.jpg" alt="Vercel Logo" uk-cover="true" />
                        <div className={`${banner.content} uk-position-right uk-text-right uk-light`}>
                            <h2 className={`${banner.helper} uk-margin-remove`}>Tái bản!</h2>
                            <h1 className={banner.title} style={{ color: '#2e8b57' }}>Thiên thần diệt thế</h1>
                            <span className={banner.copyright}>Viz Media/Seraph of the End</span>
                        </div>
                    </li>
                    <li>
                        <img src="/img/banner4.jpg" alt="Vercel Logo" uk-cover="true" />
                        <div className={`${banner.content} uk-position-left uk-text-left uk-light`}>
                            <h2 className={`${banner.helper} uk-margin-remove`}>Manga mới</h2>
                            <h1 className={banner.title} style={{ color: '#de1c4e' }}>Nhà có 5 nàng dâu</h1>
                            <span className={banner.copyright}>ダ-ト(DAT)/五つ子の誕生日</span>
                        </div>
                    </li>
                </ul>
                <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous="true" uk-slideshow-item="previous"></a>
                <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next="true" uk-slideshow-item="next"></a>
            </div>
            <nav className="uk-navbar-container" uk-navbar="true">
                <ul className="uk-navbar-nav c-navbar uk-margin-auto">
                    <li className="uk-active">
                        <Link href="/">
                            <a>Lịch phát hành</a>
                        </Link>
                    </li>
                    <li className="uk-active">
                        <Link href="/license">
                            <a>Thông tin bản quyền</a>
                        </Link>
                    </li>
                    <li className="uk-active">
                        <Link href="/store">
                            <a>Mua manga ở đâu?</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>{children}</main>
            <footer className={footer.wrapper}>
                <div className="uk-container">
                    <div className={footer.copyright}>
                        <span><a href="//facebook.com/Catouberos" target="_blank" title="Đi đến Facebook">Catouberos</a> © 2021, sử
                            dụng <a href="//getuikit.com/" target="_blank">UIKit</a> và <a href="//fullcalendar.io/"
                                target="_blank">FullCalendar</a>.</span>
                    </div>
                    <div className={footer.contact}>
                        <a title="Gửi e-mail" href="mailto:khoanguyen.do@outlook.com">Báo lỗi / Góp ý / Liên hệ</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
