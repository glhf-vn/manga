import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import grayMatter from 'gray-matter'

export const POSTS_PATH = path.join(process.cwd(), '_posts')

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

    const allPosts = files.map(file => {
        return {
            path: `/posts/${file.filename.replace('.mdx', '')}`,
            title: file.matter.data.title,
            date: file.matter.data.date
        }
    })

    const posts = allPosts.sort((a, b) =>
        dayjs(b.date).isAfter(a.date) ? 1 : -1
    ).slice(count.start, count.end)

    return posts
}

export const totalPosts = getPostSlugs.length