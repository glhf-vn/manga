import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
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
                <meta name="keywords" content="lịch phát hành, manga, comics, anime, truyện tranh" />
                <meta name="author" content="Khoa Nguyen Do" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/img/cover.jpg" />
                <meta property="og:locale" content="vi_VN" />
                <meta name="google" content="notranslate" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <div id="modal-report" uk-modal="true">
                <div className="uk-modal-dialog uk-modal-body">
                    <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                    <h2 className="uk-modal-title uk-text-bold">Đóng góp ý kiến</h2>
                    <iframe width="640px" height="480px" src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__rUdnp9UMllGSUtJSUdKRVFOSlNUS0w2MkJNU1BPQS4u&embed=true" frameBorder="0" marginWidth="0" marginHeight="0" style={{ border: "none", maxWidth: "100%", maxHeight: "100vh" }} allowFullScreen={true}></iframe>
                </div>
            </div>

            <div className={`${banner.banner} uk-position-relative uk-visible-toggle uk-light`} data-tabindex="-1" uk-slideshow="min-height: 250; max-height: 280; animation: pull; autoplay: true;">
                <ul className="uk-slideshow-items">
                    <li>
                        <Image src="/img/banner2.jpg" layout="fill" objectFit="cover" alt="Thiên thần diệt thế" uk-img="target: !.uk-slideshow-items" />
                        <div className={`${banner.content} uk-position-right uk-text-right uk-light`}>
                            <h2 className={`${banner.helper} uk-margin-remove`}>Tái bản!</h2>
                            <h1 className={banner.title} style={{ color: '#2e8b57' }}>Thiên thần diệt thế</h1>
                            <span className={banner.copyright}>Viz Media/Seraph of the End</span>
                        </div>
                    </li>
                    <li>
                        <Image src="/img/banner4.jpg" layout="fill" objectFit="cover" alt="Nhà có 5 nàng dâu" uk-img="target: !.uk-slideshow-items" />
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
            <div className={`${footer.gksfd} uk-container`}>
                <Image src="/img/gksfd.png" width={200} height={277} />
            </div>
            <footer className={footer.wrapper}>
                <div className="uk-container">
                    <div className={footer.copyright}>
                        <span><a href="//facebook.com/Catouberos" target="_blank" title="Đi đến Facebook" rel='noreferrer'>Catouberos</a> © {currentYear}, sử
                            dụng <a href="//getuikit.com/" target="_blank" rel='noreferrer'>UIKit</a> và <a href="//fullcalendar.io/"
                                target="_blank" rel='noreferrer'>FullCalendar</a>. Built on <a href="//nextjs.org" target="_blank" rel='noreferrer'>Next.JS</a></span>
                    </div>
                    <div className={footer.contact}>
                        <a title="Gửi e-mail" href="mailto:khoanguyen.do@outlook.com">Liên hệ</a>
                        <a className="uk-margin-left" title="GitHub" href="//github.com/catouberos/mangaGLHF" target="_blank" rel='noreferrer'>GitHub</a>
                        <a className="uk-margin-left" title="Twitter" href="//twitter.com/catouberos" target="_blank" rel='noreferrer'>Twitter</a>
                    </div>
                </div>
            </footer>
            <script defer={true} src="https://cdn.jsdelivr.net/npm/uikit@3.7.1/dist/js/uikit.min.js"></script>
            <script defer={true} src="https://cdn.jsdelivr.net/npm/uikit@3.7.1/dist/js/uikit-icons.min.js"></script>
        </div>
    )
}
