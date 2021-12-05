import Layout from '../../components/layout'
import Link from 'next/link'
import { getPosts, totalPosts } from '../../api/posts'

const pageTitle = ""
const pageDescription = ""

export default function Home({ posts, paged, total }) {
    const hasNextPage = total > paged;
    const hasPreviousPage = paged > 1;

    return (
        <Layout title={pageTitle} description={pageDescription}>
            <div className="uk-container">
                {posts.map(post => {
                    const { title, path } = post;
                    return (
                        <Link key={path} href={path}>
                            <a className="">
                                <h3>{title}</h3>
                            </a>
                        </Link>
                    )
                })}
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

export async function getStaticPaths() {
    const pages = Math.ceil(totalPosts / 10)

    const paths = Array.from(Array(pages).keys()).map((paged) => ({
        params: { paged: String(paged + 1) },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const posts = await getPosts(10, params.paged)
    const paged = Number(params.paged)
    const total = Math.ceil(totalPosts / 10)

    return {
        props: { posts, paged, total },
    }
}