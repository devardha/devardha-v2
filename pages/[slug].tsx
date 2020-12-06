import React from 'react'
import Styled from '@emotion/styled'
import { GraphQLClient } from 'graphql-request'
import Layout from '../components/Layout'
import { format } from 'date-fns'
import parse from 'html-react-parser'

const Article = ({ post }) => {
    const dateFormatter = (date) => {
        return format(new Date(date), "MMMM dd, yyy")
    }

    return (
        <Wrapper>
            <Layout>
                <div className="page-head">
                    <h1>{post.title}</h1>
                    <div className="author-detail">
                        <div className="user-profile">
                            <img src="https://avatars2.githubusercontent.com/u/59217768?s=460&u=50eeaffa0e1ec4afc5e16c991ed85db955b7dc2b&v=4" alt="devardha profile"/>
                        </div>
                        <span>by {post.writer}</span>
                        <span className="date">on {dateFormatter(post.createdAt)}</span>
                    </div>
                </div>
                <div className="page-body">
                    {parse(post.postBody.html)}
                </div>
            </Layout>
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`
    .page-head{
        max-width:700px;
        margin:0 auto;
        margin-bottom:2rem;
        margin-top:6rem;

        h1{
            font-size:2.75rem;
            margin:0;
            margin-bottom:1rem;
        }
    }

    .page-body{
        max-width:700px;
        padding-bottom:6rem;
        margin:0 auto;

        p{
            font-size:16px;
            line-height:1.75rem;
        }

        h2{
            margin-top:2rem;
            margin-bottom:0;
        }
    }

    .user-profile{
        height:30px;
        width:30px;
        background-color:#eee;
        margin-right:1rem;
        border-radius:50%;

        img{
            border-radius:50%;
            height:100%;
            width:100%;
        }
    }

    .author-detail{
        display:flex;
        align-items:center;
        font-size:.9rem;

        .date{
            color:#777;
            margin-left:1rem;
        }
    }
`

Article.getInitialProps = async ({ query: { slug } }) => {
    const graphcms = new GraphQLClient('https://api-ap-northeast-1.graphcms.com/v2/ckibuuti2cx3z01z2e430ak7k/master')
    const { post } = await graphcms.request(
        `
        {
            post(where: {
                slug: "${slug}"
            }){
                title,
                postBody{
                    html
                },
                image,
                writer,
                createdAt
            }
        }
        `
    )

    return { post: post }
}

export default Article