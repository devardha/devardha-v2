import firebaseAdmin from '../../lib/firebaseAdmin'

interface comment {
    id: String,
    name: String,
    createdAt: Date,
    avatar: String,
    replies: Array<comment>,
    parentId: String,
    text: String,
    likes: Number,
}

export default async (req, res) => {
    const slug = req.query.slug
    const db = firebaseAdmin.firestore()

    const comments: any = (await db.collection('posts').doc(slug).collection('comments').get()).docs.map(item => item.data())

    try {
        const list = []
        comments.map((item: comment) => {
            if(item.parentId === ""){
                const object: comment = {
                    id: item.id,
                    name: item.name,
                    createdAt: item.createdAt,
                    avatar: item.avatar,
                    replies: [],
                    parentId: item.parentId,
                    text: item.text,
                    likes: item.likes,
                }
                list.push(object)
            }
        })

        const getReplyByID = (id: String, list: Array<comment>) => {
            if(id){
                return list.filter(object => object.parentId === id)
            }
            return []
        }

        const finalList: Array<comment> = []
        list.map((item: comment) => {
            const object: comment = {
                id: item.id,
                name: item.name,
                createdAt: item.createdAt,
                avatar: item.avatar,
                replies: getReplyByID(item.id, comments),
                parentId: item.parentId,
                text: item.text,
                likes: item.likes,
            }
            finalList.push(object)
        })

        return res.status(201).json({data: finalList, count: comments.length});
    } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
    }
};