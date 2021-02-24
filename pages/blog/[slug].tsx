import React, { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import { GraphQLClient } from 'graphql-request'
import Layout from '../../components/Layout'
import ReactMarkdown from 'react-markdown'
import Head from 'next/head'
import { dateFormatter } from '../../utils/date'
import SubscribeBox from '../../components/SubscribeBox'
import CodeBlock from '../../components/CodeBlock'
import { readTime } from '../../utils/post'
import firebase from '../../lib/firebase'
import SocialShare from '../../components/SocialShare'

const Article = ({ post }) => {
    const [viewers, setViewers]: any = useState()

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'
    const env = process.env.NEXT_PUBLIC_ENV || 'development'

    const incrementViews = async (slug) => {
        const db = firebase.firestore()
            const views = await db.collection('blogviews').doc(slug).get().then(view => {
                if(view.data()){
                    return view.data().viewsCount
                }

                return 0
            })

            await db.collection('blogviews').doc(slug).set({ postId: slug, viewsCount: views + 1})
            setViewers(views + 1)
    }

    useEffect(() => {
        if(env === 'production'){
            incrementViews(post.slug)

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
        padding: 0 1.5rem;

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

            h1{
                font-size:2.75rem;
                line-height:3.5rem;
            }
        }
        .page-body{
            font-size: 1.5rem;
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