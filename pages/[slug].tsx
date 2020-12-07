import React from 'react'
import Styled from '@emotion/styled'
import { GraphQLClient } from 'graphql-request'
import Layout from '../components/Layout'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

const Article = ({ post }) => {
    const dateFormatter = (date) => {
        return format(new Date(date), "MMMM dd, yyy")
    }

    return (
        <Wrapper>
            <Layout title={`${post.title} | devArdha Blog`}>
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
                    <ReactMarkdown>
                    {post.article}
                    </ReactMarkdown>
                </div>
            </Layout>
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`
    .author-detail{
        display:flex;
        align-items:center;
        font-size:.9rem;

        .date{
            color:#777;
            margin-left:1rem;
        }
    }

    @media(min-width:768px){
        .page-head{
            margin-top:6rem;

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
    const graphcms = new GraphQLClient('https://api-ap-northeast-1.graphcms.com/v2/ckibuuti2cx3z01z2e430ak7k/master')
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
                createdAt
            }
        }
        `
    )

    return { post: post }
}

export default Article