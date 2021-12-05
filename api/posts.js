import fs from 'fs';
import path from 'path'
import grayMatter from 'gray-matter';

export const POSTS_PATH = path.join(process.cwd(), 'pages/posts')

export const getPostSlugs = fs.readdirSync(POSTS_PATH).map((file) => {
    return file.replace('/\.mdx?$/', '')
})

export async function getPosts(posts_per_page, paged) {
    const filenames = await fs.readdirSync(POSTS_PATH)

    const files = await Promise.all(filenames.map(async filename => {
        const filePath = path.join(POSTS_PATH, filename)
        const content = fs.readFileSync(filePath, 'utf8')
        const matter = grayMatter(content)
        return {
            filename,
            matter
        }
    }))

    const count = {
        start: posts_per_page * (paged - 1),
        end: posts_per_page * paged
    }

    const posts = files.slice(count.start, count.end).map(file => {
        return {
            path: `/posts/${file.filename.replace('.mdx', '')}`,
            title: file.matter.data.title
        }
    })

    return posts
}

export const totalPosts = getPostSlugs.length