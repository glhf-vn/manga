import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import BlogLayout from '../../components/bloglayout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export default function TestPage({ source, meta }) {
    return (
        <BlogLayout meta={meta}>
            <div className="wrapper">
                <h1>{meta.title}</h1>
                <MDXRemote {...source} />
            </div>
        </BlogLayout>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join(process.cwd(), '_posts'))
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.mdx', '')
        }
    }))
    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({ params: { slug } }) {
    // MDX text - can be from a local file, database, anywhere
    const source = fs.readFileSync(path.join(process.cwd(), '_posts', slug + '.mdx'), 'utf-8')

    const { content, data } = matter(source)
    const mdxSource = await serialize(content, { scope: data })
    return { props: { source: mdxSource, meta: data } }
}
