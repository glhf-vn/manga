import { google } from 'googleapis'
import styles from '../styles/styles.module.scss'
import Layout from '../components/layout'
import Head from 'next/head'

const pageTitle = "Thông tin bản quyền Manga"
const pageDescription = "Xem thông tin manga được mua bản quyền, cập nhật thường xuyên!"

export async function getStaticProps() {

    const sheets = google.sheets({
        version: 'v4',
        auth: process.env.GOOGLE_API_KEY,
    });

    // Query
    async function getSheetContent(sheetNumber) {
        const range = sheetNumber + '!A2:E1000';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range,
        });

        return response.data.values;
    }

    const licensed = await getSheetContent('licensed');
    const reprint = await getSheetContent('reprint');
    const unknown = await getSheetContent('unknown');

    // Result

    return {
        props: {
            licensed,
            reprint,
            unknown
        },
        revalidate: 3600, //revalidate every 1 hour
    }
}

export default function License({ licensed, reprint, unknown }) {
    const licensedTable = () => {
        var parsedHtml = '';

        for (var i = 0; i < licensed.length; i++) {
            let [manga, source, anilist, image, publisher] = licensed[i];

            if (publisher) {
                parsedHtml += "<h3 class='uk-width-1-1'>" + manga + "</h3>"
            } else {
                parsedHtml += `<div class="uk-width-1-1@s uk-width-1-2@l">
                <div class="uk-card uk-card-default uk-margin uk-grid-collapse " uk-grid>` +
                    (image ? `
                    <div class="uk-card-media-left uk-cover-container uk-width-1-3">
                        <img loading="lazy" src="`+ image +`" alt="" class="uk-width-medium" uk-cover>
                        <canvas width="200" height="310"></canvas>
                    </div><div class="uk-width-2-3 uk-flex uk-flex-column">` : `<div class="uk-width-1-1 uk-flex uk-flex-column">`) + `
                        <div class="uk-card-body uk-flex-1">
                            <h3 class="uk-card-title">`+ manga +`</h3>
                        </div>` +
                        ((source || anilist) ? `<div class="uk-card-footer">` +
                            (source ? `<a target="_blank" rel="noreferrer" href="` + source + `" class="uk-button uk-button-text uk-margin-right">Nguồn</a>` : '') +
                            (anilist ? `<a target="_blank" rel="noreferrer" href="//anilist.co/manga/` + anilist + `" class="uk-button uk-button-text">AniList</a>` : '') +
                        `</div>` : '') +
                    `</div>
                </div>
                </div>`
            }
        }

        return parsedHtml;
    }

    const reprintTable = () => {
        var parsedHtml = '';

        for (var i = 0; i < reprint.length; i++) {
            const [publisher, manga] = reprint[i];
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
        <Layout title={pageTitle} description={pageDescription}>
            <div className={`uk-container ${styles.main}`}>
                <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}><span>Thông tin bản quyền</span></h1>
                <div className="uk-grid-divider uk-grid-medium" uk-grid="true">
                    <div className="uk-width-1-1 uk-width-1-2@m uk-width-2-3@l">
                        <span>Đã được xác nhận bản quyền <span uk-icon="icon: info; ratio: 0.8"
                            uk-tooltip="title: Tham khảo Vinh Miner - MangaHolic 2.0, page MangaHolic và các page nhà xuất bản."></span></span>
                        <div dangerouslySetInnerHTML={{ __html: licensedTable() }} className="uk-margin-top" uk-grid="true">
                        </div>
                    </div>
                    <div className="uk-width-1-1 uk-width-1-2@m uk-width-1-3@l">
                        <span>Có kế hoạch tái bản</span>
                        <table className="uk-table uk-table-divider">
                            <thead>
                                <tr>
                                    <th>Nhà xuất bản</th>
                                    <th>Bộ truyện</th>
                                </tr>
                            </thead>
                            <tbody dangerouslySetInnerHTML={{ __html: reprintTable() }}>
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
