import styles from '/styles/styles.module.scss'
import Layout from '/components/layout'
import useSWR from 'swr'
import { useState } from 'react'

const pageTitle = "Manga Mới - Tiki Trading"
const pageDescription = "Xem manga mới phát hành chưa bao giờ là dễ hơn, nay được tổng hợp từ nhiều trang TMDT khác nhau!"
const fetcher = (...args) => fetch(...args).then(res => res.json())

var formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function Tiki({ index }) {
    const { data, error } = useSWR(`https://tiki.vn/api/personalish/v1/blocks/listings?limit=24&category=1084&page=${index}&sort=newest&seller=1&urlKey=truyen-tranh`, url => fetcher(url, {
        headers: {
            'User-Agent': "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0"
        },
        method: "GET",
        host: "tiki.vn",
    }))

    if (error) return <div>Error</div>
    if (!data) return (
        <div className="uk-width-1-1 uk-text-center">
            <span className="uk-margin-auto-left uk-margin-auto-right" uk-spinner="ratio: 2"></span>
        </div>
    )

    return (
        <>
            {data.data.map(product => {
                return (
                    <div className="uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l">
                        <a href={'https://tiki.vn/' + product.url_key + ".html"} target="_blank">
                            <div className="uk-card uk-card-small uk-card-default uk-margin uk-card-hover">
                                <div className="uk-card-media-top">
                                    <img loading="lazy" src={product.thumbnail_url} alt={product.name} className="uk-width-medium" />
                                </div>
                                <div className="uk-card-body">
                                    <h3 className="uk-card-title uk-margin-remove uk-text-default uk-text-bold">{product.name}</h3>
                                    <p>{product.original_price > product.price ?
                                        <>
                                            <span className="uk-text-success">{formatter.format(product.price)}</span>{' '}
                                            <span className="uk-text-danger uk-text-small" style={{ textDecoration: "line-through" }}>{formatter.format(product.original_price)}</span>
                                        </> :
                                        <span className="uk-text-primary">{formatter.format(product.price)}</span>
                                    }</p>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            })}
        </>
    )
}

export default function TikiMangaListing() {
    const [pageIndex, setPageIndex] = useState(1);
    return (
        <Layout title={pageTitle} description={pageDescription}>
            <div className={`uk-container ${styles.main}`}>
                <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}><span>Manga Mới - Tiki Trading</span></h1>
                <div className="uk-margin-top" uk-grid="true">
                    <Tiki index={pageIndex} />
                    <div style={{ display: 'none' }}><Tiki index={pageIndex + 1} /></div>
                </div>
                <ul className="uk-pagination">
                    {pageIndex > 1 ? <li className="uk-margin-small-right"><a onClick={() => setPageIndex(pageIndex - 1)}><span className="uk-margin-small-right" uk-pagination-previous="true"></span> Trước</a></li> : ''}
                    <li className="uk-margin-auto-left"><a onClick={() => setPageIndex(pageIndex + 1)}>Sau <span className="uk-margin-small-left" uk-pagination-next="true"></span></a></li>
                </ul>
            </div>
        </Layout >
    )
}
