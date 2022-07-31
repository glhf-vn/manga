import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/router"
import footer from './footer.module.scss'
import nav from './nav.module.scss'

export default function Layout({ children, title, description }) {
    const router = useRouter();

    const currentYear = new Date().getFullYear();

    return (
        <div>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet="utf-8" />
                <meta httpEquiv="content-language" content="vi" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                {/* the title */}
                <title>{title + " / manga.GLHF.vn"}</title>
                <meta name="title" content={title} />
                <meta property="og:title" content={title} />

                {/* the description */}
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />

                {/* misc */}
                <meta name="keywords" content="lịch phát hành, manga, comics, anime, truyện tranh" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/img/cover.jpg" />
                <meta property="og:locale" content="vi_VN" />
                <meta name="google" content="notranslate" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="true" />

                <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/favicon/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
            </Head>

            <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
                <nav className="uk-navbar-container" uk-navbar="true">
                    <ul className={`${nav.wrapper} uk-navbar-nav uk-margin-auto`}>
                        <li>
                            <Link href="/" scroll={false}>
                                <a><Image layout="fixed" src="/img/logo_rzt5it.png" width="48" height="24" alt="GLHF logo" /></a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/" ? "uk-active" : ""}>
                            <Link href="/" scroll={false}>
                                <a>Lịch phát hành</a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/license" ? "uk-active" : ""}>
                            <Link href="/license" scroll={false}>
                                <a>Bản quyền</a>
                            </Link>
                        </li>
                        <li className={router.pathname.includes("listing") ? "uk-active" : ""}>
                            <a href="#">Truyện mới</a>
                            <div className="uk-navbar-dropdown">
                                <ul className="uk-nav uk-navbar-dropdown-nav">
                                    <li className="uk-nav-header">Manga</li>
                                    <li className={router.pathname.includes('/listing/manga/tiki') ? "uk-active" : ""}>
                                        <Link href="/listing/manga/tiki/1" scroll={false}>
                                            <a>Tiki Trading</a>
                                        </Link>
                                    </li>
                                    <li className={router.pathname == '/listing/manga/fahasa' ? "uk-active" : ""}>
                                        <Link href="/listing/manga/fahasa" scroll={false}>
                                            <a>Fahasa</a>
                                        </Link>
                                    </li>
                                    <li className="uk-nav-header">Light-novel</li>
                                    <li className={router.pathname.includes('/listing/light-novel/tiki') ? "uk-active" : ""}>
                                        <Link href="/listing/light-novel/tiki/1" scroll={false}>
                                            <a>Tiki Trading</a>
                                        </Link>
                                    </li>
                                    <li className={router.pathname == '/listing/light-novel/fahasa' ? "uk-active" : ""}>
                                        <Link href="/listing/light-novel/fahasa" scroll={false}>
                                            <a>Fahasa</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a uk-toggle="target: #modal-donate">{'Ủng hộ <3'}</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="modal-donate" uk-modal="true">
                <div className="uk-modal-dialog uk-modal-body" style={{ overflow: 'initial' }}>
                    <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                    <h2 className="uk-modal-title uk-text-bold">{'Ủng hộ <3'}</h2>
                    <div className="uk-inline">
                        <button type="button" id="vietcombank"
                            className="uk-button uk-button-secondary uk-margin-small-top uk-margin-small-right" style={{ background: '#81BC41', border: 'none' }}>Chuyển khoản</button>
                        <div uk-drop="mode: hover; delay-hide: 0">
                            <Image width={660} height={993} layout="responsive" alt="Chuyển khoản (Vietcombank)" src='/img/vietcombank.jpg' />
                        </div>
                    </div>
                    <div className="uk-inline">
                        <button type="button" id="zalopay"
                            className="uk-button uk-button-secondary uk-margin-small-top uk-margin-small-right" style={{ background: '#0068ff', border: 'none' }}>ZaloPay</button>
                        <div uk-drop="mode: hover; delay-hide: 0">
                            <Image width={480} height={660} layout="responsive" alt="ZaloPay" src='/img/zalopay.jpg' />
                        </div>
                    </div>
                    <div className="uk-inline">
                        <button type="button" id="momo"
                            className="uk-button uk-button-secondary uk-margin-small-top uk-margin-small-right" style={{ background: '#a50064', border: 'none' }}>MoMo</button>
                        <div uk-drop="mode: hover; delay-hide: 0">
                            <Image width={259} height={259} layout="responsive" alt="MoMo" src='/img/momo.png' />
                        </div>
                    </div>
                    <button id="paypal" href="https://paypal.me/tottidkn" target="_parent"
                        className="uk-button uk-button-secondary uk-margin-small-top uk-margin-small-right" style={{ background: '#0070ba', border: 'none' }}>PayPal</button>
                </div>
            </div>
            <main>{children}</main>
            <div className={`${footer.artwork}`}>
                <Image src="/img/glhfoverlay.png" alt="mangaGLHF" width={382} height={229} />
            </div>
            <footer className={footer.wrapper}>
                <div className="uk-container">
                    <div className={footer.copyright}>
                        <span>
                            <a href="//facebook.com/mangaGLHF" target="_blank" title="Đi đến Facebook" rel='noreferrer'>mangaGLHF</a>
                            {' '} © {currentYear}
                        </span>
                    </div>
                    <div className={footer.contact}>
                        <a title="Gửi e-mail" href="mailto:konnichiwa@glhf.vn">Liên hệ</a>
                        <Link href="/oss" scroll={false}><a className="uk-margin-left">OSS Licenses</a></Link>
                        <a className="uk-margin-left" title="GitHub" href="//github.com/catouberos/mangaGLHF" target="_blank" rel='noreferrer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </a>
                        <a className="uk-margin-left" title="Discord" href="//via.glhf.vn/discord" target="_blank" rel='noreferrer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                            </svg>
                        </a>
                        <a className="uk-margin-left" title="Facebook" href="//facebook.com/mangaGLHF" target="_blank" rel='noreferrer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                        </a>
                        <a className="uk-margin-left" title="Twitter" href="//twitter.com/mangaGLHF" target="_blank" rel='noreferrer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
            <script defer={true} src="https://cdn.jsdelivr.net/npm/uikit@3.7.1/dist/js/uikit.min.js"></script>
            <script defer={true} src="https://cdn.jsdelivr.net/npm/uikit@3.7.1/dist/js/uikit-icons.min.js"></script>
        </div>
    )
}
