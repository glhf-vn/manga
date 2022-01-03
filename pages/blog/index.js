import Layout from '../../components/layout'
import Link from 'next/link'
import card from '../../styles/card.module.scss'
import { getPosts, totalPosts } from '../../api/posts'

const pageTitle = "Bài viết"
const pageDescription = ""

export default function Home({ posts, paged, total }) {
    const hasNextPage = total > paged;
    const hasPreviousPage = paged > 1;

    return (
        <Layout title={pageTitle} description={pageDescription}>
            <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
                <div className="uk-child-width-1-3@m" uk-grid="true">
                    {posts.map(post => {
                        const { title, path, meta } = post;
                        return (
                            <Link key={path} href={path}>
                                <a>
                                    <div className="uk-card uk-card-default uk-card-hover">
                                    <div className={`${card.top} uk-card-media-top`}>
                                            <h4 className={card.category} style={{ color: meta.category.color }}>{meta.category.name}</h4>
                                            <img src={meta.cover} alt="" />
                                            <div className={card.highlight} style={{ background: meta.category.color }}></div>
                                        </div>
                                        <div className={`uk-card-body ${card.body}`}>
                                            <h3 className="uk-card-title">{title}</h3>
                                            <p>{meta.excerpt}</p>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )
                    })}
                </div>
                {hasPreviousPage ? (
                    <Link href={`/blog/${paged - 1}`}>
                        <a>Prev</a>
                    </Link>
                ) : ''}
                {hasNextPage ? (
                    <Link href={`/blog/${paged + 1}`}>
                        <a>Next</a>
                    </Link>
                ) : ''}
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const posts = await getPosts(12, 1)
    const paged = Number(1)
    const total = Math.ceil(totalPosts / 12)

    return {
        props: { posts, paged, total },
    }
}