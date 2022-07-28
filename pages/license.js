import { google } from 'googleapis'
import styles from '../styles/styles.module.scss'
import Layout from '../components/layout'
import { getCover } from '../lib/anilist'

const pageTitle = "Thông tin bản quyền Manga"
const pageDescription = "Xem thông tin manga được mua bản quyền, cập nhật thường xuyên!"

export async function getStaticProps() {
    const googleApiKey = process.env.GOOGLE_API_KEY

    const sheets = google.sheets({
        version: 'v4',
        auth: googleApiKey,
    });

    // Query
    async function getSheetContent(sheetNumber) {
        const range = sheetNumber + '!A2:F1000'

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range,
        })

        return response.data.values
    }

    let data = await getSheetContent('licensed')
    let unknown = await getSheetContent('unknown')

    // Result

    const pillColors = {
        'manga': "#29b6f6",
        'manhwa': "#29b6f6",
        'manhua': "#29b6f6",
        'artbook': "#ef5350",
        'light-novel': "#ffca28",
        'fanbook': "#ff7043",
        'encyclopedia': "#66bb6a"
    }

    let licensed = await Promise.all(data.map(
        async ([name, source, anilist, image, publisher, type]) => {
            return {
                name,
                source,
                anilist,
                image,
                publisher,
                type,
                color: pillColors[type.toLowerCase()],
            }
        }
    ))

    return {
        props: {
            licensed,
            unknown
        },
        revalidate: 3600, //revalidate every 1 hour
    }
}

export default function License({ licensed, unknown }) {
    return (
        <Layout title={pageTitle} description={pageDescription}>
            <div className={`uk-container ${styles.main}`}>
                <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}><span>Thông tin bản quyền</span></h1>
                <div className="uk-grid-divider uk-grid-medium" uk-grid="true">
                    <div className="uk-width-1-1 uk-width-1-2@m uk-width-2-3@l">
                        <span>Đã được xác nhận bản quyền <span uk-icon="icon: info; ratio: 0.8"
                            uk-tooltip="title: Tham khảo Vinh Miner - MangaHolic 2.0, page MangaHolic và các page nhà xuất bản."></span></span>
                        <div uk-filter="target: .manga-list">
                            <div className="uk-margin-top">
                                <ul className="uk-subnav uk-subnav-pill" uk-margin="true">
                                    <li className="uk-active" uk-filter-control=''><a href="#">Tất cả</a></li>
                                </ul>
                                <ul className="uk-subnav uk-subnav-pill" uk-margin="true">
                                    <li uk-filter-control="filter: [data-type='manga']; group: type"><a href="#">Manga</a></li>
                                    <li uk-filter-control="filter: [data-type='manhwa']; group: type"><a href="#">Manhwa</a></li>
                                    <li uk-filter-control="filter: [data-type='manhua']; group: type"><a href="#">Manhua</a></li>
                                    <li uk-filter-control="filter: [data-type='light-novel']; group: type"><a href="#">Light-novel</a></li>
                                    <li uk-filter-control="filter: [data-type='artbook']; group: type"><a href="#">Artbook</a></li>
                                    <li uk-filter-control="filter: [data-type='fanbook']; group: type"><a href="#">Fanbook</a></li>
                                    <li uk-filter-control="filter: [data-type='encyclopedia']; group: type"><a href="#">Encyclopedia</a></li>
                                </ul>
                                <ul className="uk-subnav uk-subnav-pill" uk-margin="true">
                                    <li uk-filter-control="filter: [data-publisher='nhã nam']; group: publisher"><a href="#">Nhã Nam</a></li>
                                    <li uk-filter-control="filter: [data-publisher='skycomics']; group: publisher"><a href="#">SkyComics</a></li>
                                    <li uk-filter-control="filter: [data-publisher='daisy.comics']; group: publisher"><a href="#">Daisy.Comics</a></li>
                                    <li uk-filter-control="filter: [data-publisher='uranix']; group: publisher"><a href="#">Uranix</a></li>
                                    <li uk-filter-control="filter: [data-publisher='amak']; group: publisher"><a href="#">AMAK</a></li>
                                    <li uk-filter-control="filter: [data-publisher='ipm']; group: publisher"><a href="#">IPM</a></li>
                                    <li uk-filter-control="filter: [data-publisher='mori manga']; group: publisher"><a href="#">Mori Manga</a></li>
                                    <li uk-filter-control="filter: [data-publisher='ichi ln']; group: publisher"><a href="#">Ichi LN</a></li>
                                    <li uk-filter-control="filter: [data-publisher='hikari']; group: publisher"><a href="#">Hikari</a></li>
                                    <li uk-filter-control="filter: [data-publisher='nxb trẻ']; group: publisher"><a href="#">NXB Trẻ</a></li>
                                    <li uk-filter-control="filter: [data-publisher='nxb kim đồng']; group: publisher"><a href="#">NXB Kim Đồng</a></li>
                                </ul>
                            </div>
                            <ul className="uk-margin-top manga-list" uk-grid="true">
                                {licensed.map((manga) => {
                                    return (
                                        <li className="uk-width-1-1@s uk-width-1-2@l" key={manga.name} data-type={manga.type.toLowerCase()} data-publisher={manga.publisher.toLowerCase()}>
                                            <div className="uk-card uk-card-default uk-margin uk-grid-collapse uk-card-hover" uk-grid="true">
                                                {manga.image &&
                                                    <div className="uk-card-media-left uk-cover-container uk-width-1-3" uk-lightbox="true">
                                                        <a href={manga.image}>
                                                            <img loading="lazy" src={manga.image} alt={manga.name} className="uk-width-medium" uk-cover="true" />
                                                            <canvas width="200" height="310"></canvas>
                                                        </a>
                                                    </div>
                                                }
                                                <div className={manga.image ? "uk-width-2-3 uk-flex uk-flex-column" : 'uk-flex uk-flex-column'}>
                                                    <div className="uk-card-body uk-flex-1">
                                                        {manga.type && <div className="uk-card-badge uk-label uk-text-small uk-text-capitalize uk-margin-remove" style={{ top: 0, right: 0, borderRadius: '0 0 0 0.5rem', backgroundColor: manga.color }}>{manga.type}</div>}
                                                        <span className='uk-text-meta'>{manga.publisher}</span>
                                                        <h3 className="uk-card-title uk-margin-remove">{manga.name}</h3>
                                                    </div>
                                                    {(manga.source || manga.anilist) &&
                                                        <div className="uk-card-footer">
                                                            {manga.source && <a target="_blank" rel="noreferrer" href={manga.source} className="uk-button uk-button-text uk-margin-right">Nguồn</a>}
                                                            {manga.anilist && <a target="_blank" rel="noreferrer" href={"//anilist.co/manga/" + manga.anilist} className="uk-button uk-button-text">AniList</a>}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="uk-width-1-1 uk-width-1-2@m uk-width-1-3@l">
                        <span>Bản quyền?</span> <span uk-icon="icon: info; ratio: 0.8"
                            uk-tooltip="title: Là những bộ truyện đã được 'nhá' bản quyền nhưng tình trạng vẫn chưa rõ, hoặc chưa biết thuộc về nhà xuất bản nào."></span>
                        <table className="uk-table uk-table-divider">
                            <thead>
                                <tr>
                                    <th>Bộ truyện</th>
                                </tr>
                            </thead>
                            <tbody>
                                {unknown.map(manga => {
                                    const [title, source, anilist] = manga

                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    {title}{' '}
                                                    {anilist && <a href={'//anilist.co/manga/' + anilist} target='_blank' rel='noreferrer' uk-tooltip='Xem trên AniList'><span uk-icon='icon: info; ratio: 0.8'></span></a>}{' '}
                                                    {source && <a href={source} target='_blank' rel='noreferrer' uk-tooltip='Nguồn'><span uk-icon='icon: question; ratio: 0.8'></span></a>}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
