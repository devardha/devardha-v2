import { request } from 'graphql-request'
import algoliasearch from 'algoliasearch'

export default async (req, res) => {
    try {
        // Fetch all post
        const apiKey = process.env.NEXT_PUBLIC_GRAPHCMS

        const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
        const index = client.initIndex('posts')

        const query = `
        {
            posts{
                id,
                title,
                article,
                description,
                slug,
                image,
                writer,
                createdAt
            }
        }
        `

        const { posts } = await request(apiKey, query)

        const wrapper = []
        posts.map(item => {
            wrapper.push({
                objectID: item.id,
                title: item.title,
                article: item.article,
                description: item.description,
                slug: item.slug,
                image: item.image,
                writer: item.writer,
                createdAt: item.createdAt
            })
        })

        index.replaceAllObjects(wrapper).then(() => {
            return res.status(200).json({msg: "Data synced successfully", success: true})
        }).catch((error) => {
            return res.status(500).json({msg: error.message || error.toString(), success: false})
        })
    } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
    }
};