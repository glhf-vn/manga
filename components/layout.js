import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router";
import banner from './banner.module.scss'
import footer from './footer.module.scss'
import nav from './nav.module.scss'

export default function Layout({ children }) {
    const router = useRouter();

    const currentYear = new Date().getFullYear();

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
            <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
                <nav className="uk-navbar-container" uk-navbar="true">
                    <ul className={`${nav.wrapper} uk-navbar-nav uk-margin-auto`}>
                        <li className={router.pathname == "/" ? "uk-active" : ""}>
                            <Link href="/" scroll={false}>
                                <a>Lịch phát hành</a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/license" ? "uk-active" : ""}>
                            <Link href="/license" scroll={false}>
                                <a>Thông tin bản quyền</a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/store" ? "uk-active" : ""}>
                            <Link href="/store" scroll={false}>
                                <a>Mua manga ở đâu?</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <main>{children}</main>
            <footer className={footer.wrapper}>
                <div className="uk-container">
                    <div className={footer.copyright}>
                        <span><a href="//facebook.com/Catouberos" target="_blank" title="Đi đến Facebook" rel='noreferrer'>Catouberos</a> © {currentYear}, sử
                            dụng <a href="//getuikit.com/" target="_blank" rel='noreferrer'>UIKit</a> và <a href="//fullcalendar.io/"
                                target="_blank" rel='noreferrer'>FullCalendar</a>. Built on <a href="nextjs.org" target="_blank" rel='noreferrer'>Next.JS</a></span>
                    </div>
                    <div className={footer.contact}>
                        <a title="Gửi e-mail" href="mailto:khoanguyen.do@outlook.com">Liên hệ</a>
                        <a className="uk-margin-left" title="GitHub" href="//github.com/catouberos/mangaGLHF" target="_blank" rel='noreferrer'>GitHub</a>
                        <a className="uk-margin-left" title="Twitter" href="//twitter.com/catouberos" target="_blank" rel='noreferrer'>Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
