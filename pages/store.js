import { google } from 'googleapis'
import styles from '../styles/styles.module.scss'
import Layout from '../components/layout'
import Head from 'next/head'

const pageTitle = "Mua Manga ở đâu?"
const pageDescription = "Tìm chỗ mua manga chưa bao giờ dễ hơn, được tổng hợp và đóng góp bởi cộng đồng!"

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

    const online = await getSheetContent('onlinestore');
    const offline = await getSheetContent('offlinestore');
    const shopee = await getSheetContent('shopee');

    // Result

    return {
        props: {
            online,
            offline,
            shopee
        },
        revalidate: 7200, //revalidate every 2 hour
    }
}

export default function License({ online, offline, shopee }) {
    function openReportModal() {
      UIkit.modal('#modal-report').show();
    }

    const onlineTable = () => {
        var parsedHtml = '';

        for (var i = 0; i < online.length; i++) {
            const [store, url, tel, notes] = online[i];
            parsedHtml +=
                "<tr>" +
                "<td><a href='" +
                url +
                "' target='_blank' rel='noreferrer'>" +
                store +
                " <span uk-icon='link'></span></a></td>" +
                "<td><a href='tel:" +
                tel +
                "'>" +
                (tel ?? '') +
                "</a>" +
                "</td>" +
                "<td>" +
                (notes ?? '') +
                "</td>" +
                "</tr>";
        }

        return parsedHtml;
    }

    const offlineTable = () => {
        var parsedHtml = '';

        for (var i = 0; i < offline.length; i++) {
            const [store, address, tel, notes] = offline[i];
            parsedHtml +=
                "<tr>" +
                "<td>" +
                store +
                "</td>" +
                "<td>" +
                (address ?? '') +
                "</td>" +
                "<td><a href='tel:" +
                tel +
                "'>" +
                (tel ?? '') +
                "</a>" +
                "</td>" +
                "<td>" +
                (notes ?? '') +
                "</td>" +
                "</tr>";
        }

        return parsedHtml;
    }

    const shopeeTable = () => {
        var parsedHtml = '';

        for (var i = 0; i < shopee.length; i++) {
            const [store, url, tel, notes] = shopee[i];
            parsedHtml +=
                "<tr>" +
                "<td><a href='" +
                url +
                "' target='_blank' rel='noreferrer'>" +
                store +
                " <span uk-icon='link'></span></a></td>" +
                "<td><a href='tel:" +
                tel +
                "'>" +
                (tel ?? '') +
                "</a>" +
                "</td>" +
                "<td>" +
                (notes ?? '') +
                "</td>" +
                "</tr>";
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
                <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}><span>Mua manga ở đâu?</span></h1>
                <div uk-alert="true">
                    <a className="uk-alert-close" uk-close="true"></a>
                    Bạn có thể đóng góp thêm địa điểm hoặc báo sai thông tin tại <a href="#" onClick={openReportModal}>đây</a>.
                    Ngoài ra, ấn Ctrl+F (hoặc tìm kiếm trên trang) để tìm nhanh hơn.
                </div>
                <ul uk-accordion="multiple: true">
                    <li>
                        <a className="uk-accordion-title" href="#">Trực tuyến</a>
                        <div className="uk-accordion-content">
                            <table className="uk-table uk-table-divider uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th>Cửa hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody dangerouslySetInnerHTML={{ __html: onlineTable() }}>
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li>
                        <a className="uk-accordion-title" href="#">Trực tuyến - Shopee</a>
                        <div className="uk-accordion-content">
                            <table className="uk-table uk-table-divider uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th>Cửa hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody dangerouslySetInnerHTML={{ __html: shopeeTable() }}>
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li>
                        <a className="uk-accordion-title" href="#">Các cửa hàng</a>
                        <div className="uk-accordion-content">
                            <table className="uk-table uk-table-divider uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th>Cửa hàng</th>
                                        <th>Địa chỉ</th>
                                        <th>Số điện thoại</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody dangerouslySetInnerHTML={{ __html: offlineTable() }}>
                                </tbody>
                            </table>
                        </div>
                    </li>
                </ul>
            </div>
        </Layout >
    )
}
