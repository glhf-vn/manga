import { google } from 'googleapis'
import styles from '../styles/styles.module.scss'
import Layout from '../components/layout'
import Head from 'next/head'

const pageTitle = "Thông tin bản quyền Manga"
const pageDescription = "Xem thông tin manga được mua bản quyền, cập nhật thường xuyên!"

export async function getStaticProps() {

    // Auth
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    // Query
    async function getSheetContent(sheetNumber) {
        const range = sheetNumber + '!A2:D1000';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range,
        });

        return response.data.values;
    }

    const licensed = await getSheetContent('licensed');
    const paused = await getSheetContent('paused');
    const unknown = await getSheetContent('unknown');

    // Result

    return {
        props: {
            licensed,
            paused,
            unknown
        },
        revalidate: 900, //revalidate every 15 min
    }
}

export default function License({ licensed, paused, unknown }) {
    const licensedTable = () => {
        var parsedHtml = '';

        for (var i = 0; i < licensed.length; i++) {
            const [manga, source, anilist] = licensed[i];
            parsedHtml +=
                "<tr><td><span class='uk-margin-small-right'>" +
                manga +
                "</span>" +
                (anilist ? "<a href='//anilist.co/manga/" +
                anilist +
                "' target='_blank' rel='noreferrer' uk-tooltip='Xem trên AniList'><span uk-icon='icon: info; ratio: 0.8'></span></a>" : '') + 
                (source ? " <a href='" +
                source +
                "' target='_blank' rel='noreferrer' uk-tooltip='Nguồn'><span uk-icon='icon: question; ratio: 0.8'></span></a>" : '') +
                "</td></tr>";
        }

        return parsedHtml;
    }

    const pausedTable = () => {
        var parsedHtml = '';

        for (var i = 0; i < paused.length; i++) {
            const [publisher, manga] = paused[i];
            parsedHtml += "<tr><td>" + publisher + "</td><td>" + manga + "</td></tr>";
        }

        return parsedHtml;
    }

    const unknownTable = () => {
        var parsedHtml = '';

        for (var i = 0; i < unknown.length; i++) {
            const [manga, source, anilist] = unknown[i];
            parsedHtml +=
                "<tr><td>" +
                manga +
                (anilist ? " <a href='//anilist.co/manga/" +
                anilist +
                "' target='_blank' rel='noreferrer' uk-tooltip='Xem trên AniList'><span uk-icon='icon: info; ratio: 0.8'></span></a>" : '') + 
                (source ? " <a href='" +
                source +
                "' target='_blank' rel='noreferrer' uk-tooltip='Nguồn'><span uk-icon='icon: question; ratio: 0.8'></span></a>" : '') +
                "</td></tr>";
        }

        return parsedHtml;
    }

    return (
        <Layout>
        <Head>
          <title>{pageTitle + " / manga.GLHF.vn"}</title>
          <meta property="og:title" content={pageTitle} />
          <meta name="description" content={pageDescription} />
          <meta property="og:description" content={pageDescription} />
        </Head>
            <div className={`uk-container ${styles.main}`}>
                <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}><span>Thông tin bản quyền</span></h1>
                <div className="uk-grid-divider uk-grid-medium" uk-grid="true">
                    <div className="uk-width-1-1 uk-width-1-2@m uk-width-2-3@l">
                        <span>Đã được xác nhận bản quyền <span uk-icon="icon: info; ratio: 0.8"
                            uk-tooltip="title: Tham khảo Vinh Miner - MangaHolic 2.0, page MangaHolic và các page nhà xuất bản."></span></span>
                        <table className="uk-table uk-table-divider" >
                            <tbody dangerouslySetInnerHTML={{ __html: licensedTable() }}>
                            </tbody>
                        </table>
                    </div>
                    <div className="uk-width-1-1 uk-width-1-2@m uk-width-1-3@l">
                        <span>Hiện đang tạm dừng xuất bản</span>
                        <table className="uk-table uk-table-divider">
                            <thead>
                                <tr>
                                    <th>Nhà xuất bản</th>
                                    <th>Bộ truyện</th>
                                </tr>
                            </thead>
                            <tbody dangerouslySetInnerHTML={{ __html: pausedTable() }}>
                            </tbody>
                        </table>
                        <span>Bản quyền?</span> <span uk-icon="icon: info; ratio: 0.8"
                            uk-tooltip="title: Là những bộ truyện đã được 'nhá' bản quyền nhưng tình trạng vẫn chưa rõ, hoặc chưa biết thuộc về nhà xuất bản nào."></span>
                        <table className="uk-table uk-table-divider">
                            <thead>
                                <tr>
                                    <th>Bộ truyện</th>
                                </tr>
                            </thead>
                            <tbody dangerouslySetInnerHTML={{ __html: unknownTable() }}>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
