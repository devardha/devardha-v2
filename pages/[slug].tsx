import React, { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import { GraphQLClient } from 'graphql-request'
import Layout from '../components/Layout'
import ReactMarkdown from 'react-markdown'
import Head from 'next/head'
import { dateFormatter } from '../utils/date'
import SubscribeBox from '../components/SubscribeBox'
import CodeBlock from '../components/CodeBlock'
import { readTime } from '../utils/post'
import { trackUser } from '../utils/usertracking'
import CommentBox from '../components/CommentBox'
import firebase from '../lib/firebase'
import { v4 as uuid } from 'uuid';
import { useQuery } from 'react-query'
import SocialShare from '../components/SocialShare'

const Article = ({ post }) => {
    const [viewers, setViewers]: any = useState()
    const [comments, setComments] = useState([])
    const [totalComment, setTotalComment] = useState(0)
    const [message, setMessage] = useState({})
    const [replyOpen, setReplyOpen] = useState(null)
    const [loading, setLoading] = useState(false)

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'
    const env = process.env.NEXT_PUBLIC_ENV || 'development'

    const { data } = useQuery('comments', () =>
        fetch(`${domain}/api/comments?slug=${post.slug}`).then(res =>
            res.json()
        )
    )

    useEffect(() => {
        if(data){
            setComments(data.data)
            setTotalComment(data.count)
        }
    }, [data])

    const postComment = (e) => {
        setMessage({})
        setLoading(true)
        const db = firebase.firestore()
        e.preventDefault()

        const id = uuid()
        const name = e.currentTarget.elements.name.value
        const text = e.currentTarget.elements.text.value
        const now = new Date
        var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

        db.collection('posts').doc(post.slug).collection('comments').doc(id).set({
            id: id,
            name: name,
            createdAt: utc_timestamp,
            avatar: "",
            replies: [],
            parentId: "",
            text: text,
            likes: 0,
        }).then( async () => {
            const res = await fetch(`${domain}/api/comments?slug=${post.slug}`)
            const data = await res.json()

            setLoading(false)
            setComments(data.data)
            setTotalComment(data.count)
            setMessage({type:'comment', msg:'Comment has been sent'})
        }).catch(() => {
            setMessage({type:'comment', msg:'Failed to send comment'})
            setLoading(false)
        })
    }

    const postReply = (e) => {
        setMessage({})
        setLoading(true)
        const db = firebase.firestore()
        e.preventDefault()

        const id = uuid()
        const name = e.currentTarget.elements.name.value
        const text = e.currentTarget.elements.text.value
        const now = new Date
        var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

        db.collection('posts').doc(post.slug).collection('comments').doc(id).set({
            id: id,
            name: name,
            createdAt: utc_timestamp,
            avatar: "",
            replies: [],
            parentId: replyOpen,
            text: text,
            likes: 0,
        }).then(async () => {
            const res = await fetch(`${domain}/api/comments?slug=${post.slug}`)
            const data = await res.json()

            setLoading(false)
            setComments(data.data)
            setTotalComment(data.count)
            setMessage({type:'reply', msg:'Reply has been sent'})
        }).catch(() => {
            setMessage({type:'reply', msg:'Failed to send reply'})
            setLoading(false)
        })
    }

    useEffect(() => {
        const trackme = localStorage.getItem('trackme')
        if(env === 'production' && !trackme){
            trackUser(post.slug)
        }
    }, [post.slug])

    return (
        <Wrapper>
            <Layout title={`${post.title} | DevArdha Blog`} description={post.description}>
                <Head>
                    <meta property="og:title" content={post.title} />
                    <meta property="og:url" content={`https:devardha.vercel.app/${post.slug}`} />
                    <meta property="og:description" content={post.description} />
                    <meta property="og:image" content={post.image} />

                    <meta property="twitter:card" content="summary"/>
                    <meta property="twitter:title" content={post.title}/>
                    <meta property="twitter:description" content={post.description}/>
                    <meta property="twitter:url" content={`https:devardha.vercel.app/${post.slug}`}/>
                    <meta property="twitter:image" content={post.image}/>
                </Head>
                <div className="page-head">
                    <h1>{post.title}</h1>
                    <div className="author-detail">
                        <div className="user-profile">
                            <img src="https://avatars2.githubusercontent.com/u/59217768?s=460&u=50eeaffa0e1ec4afc5e16c991ed85db955b7dc2b&v=4" alt="devardha profile"/>
                        </div>
                        <span className="name">by {post.writer}</span>
                        <span className="date">on {dateFormatter(post.createdAt)}</span>
                        <span className="post-info">
                            <span>{readTime(post.article)} Min Read •</span>
                            <span className="views">{ viewers ? viewers : '---' } views</span>
                        </span>
                    </div>
                    <div className="post-image">
                        <SocialShare url={`${domain}/${post.slug}`} title={post.title}/>
                        <img src={post.image} alt={post.title}/>
                    </div>
                </div>
                <div className="page-body">
                    <ReactMarkdown escapeHtml={true} source={post.article} renderers={{ code: CodeBlock }}/>
                </div>
                <div className="wrapper">
                    <CommentBox
                        comments={comments}
                        postComment={postComment}
                        postReply={postReply}
                        replyOpen={replyOpen}
                        setReplyOpen={setReplyOpen}
                        setMessage={setMessage}
                        totalComment={totalComment}
                        message={message}/>
                    <SubscribeBox/>
                </div>
            </Layout>
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`
    nav{
        ul{
            max-width:800px !important;
        }
    }

    .page-head{
        margin-top:8rem;

        .post-image{
            width:100%;
            position:relative;
            margin-top:2rem;

            img{
                width:100%;
                height:100%;
                object-fit:cover;
            }
        }
    }

    .author-detail{
        display:flex;
        align-items:center;
        font-size:.9rem;
        flex-wrap:wrap;

        .post-info{
            color:#777;
        }

        .name{
            color:var(--color);
        }

        .date{
            color:var(--color-secondary);
            margin-left:5px;
        }

        .views{
            margin-left:4px;
        }
    }

    @media(min-width:768px){
        .page-head{
            padding:0;

            h1{
                font-size:2.75rem;
                line-height:3.5rem;
            }
        }
        .page-body{
            font-size: 1.5rem;
            padding:0;
        }
    }
`

Article.getInitialProps = async ({ query: { slug } }) => {
    const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS)
    const { post } = await graphcms.request(
        `
        {
            post(where: {
                slug: "${slug}"
            }){
                title,
                article,
                image,
                writer,
                createdAt,
                description,
                slug
            }
        }
        `
    )

    return { post: post }
}

export default Article