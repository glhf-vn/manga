import { google } from 'googleapis'
import styles from '../styles/styles.module.scss'
import Layout from '../components/layout'

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
    console.log(online)

    const onlineTable = () => {
        var parsedHtml = '';

        for (var i = 0; i < online.length; i++) {
            const [store, url, tel, notes] = online[i];
            parsedHtml +=
                "<tr>" +
                "<td><a href='" +
                url +
                "' target='_blank'>" +
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
                "' target='_blank'>" +
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
            <div className={`uk-container ${styles.main}`}>
                <h1 className={`uk-heading-line ${styles.title}`}><span>Mua manga ở đâu?</span></h1>
                <div uk-alert="true">
                    <a class="uk-alert-close" uk-close="true"></a>
                    Bạn có thể đóng góp thêm địa điểm tại <a href="https://docs.google.com/spreadsheets/d/1PWLmQ9mk6miHx1EjEIorJCqnNszJsq_QP7KN-vMikQE/edit?usp=sharing" target="_blank">đây</a>.
                    Ngoài ra, ấn Ctrl+F (hoặc tìm kiếm trên trang) để tìm nhanh hơn.
                </div>
                <ul uk-accordion="multiple: true">
                    <li>
                        <a class="uk-accordion-title" href="#">Trực tuyến</a>
                        <div class="uk-accordion-content">
                            <table class="uk-table uk-table-divider uk-table-responsive">
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
                        <a class="uk-accordion-title" href="#">Trực tuyến - Shopee</a>
                        <div class="uk-accordion-content">
                            <table class="uk-table uk-table-divider uk-table-responsive">
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
                        <a class="uk-accordion-title" href="#">Các cửa hàng</a>
                        <div class="uk-accordion-content">
                            <table class="uk-table uk-table-divider uk-table-responsive">
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
