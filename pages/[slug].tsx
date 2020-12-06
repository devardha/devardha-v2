import React from 'react'
import Styled from '@emotion/styled'
import { GraphQLClient } from 'graphql-request';
    
const Article = ({ post }) => {
    return (
        <Wrapper>
            {post?.title}
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`
    
`

Article.getInitialProps = async ({ query: { slug } }) => {
    const graphcms = new GraphQLClient('https://api-ap-northeast-1.graphcms.com/v2/ckibuuti2cx3z01z2e430ak7k/master')
    console.log(slug)
    const { post } = await graphcms.request(
        `
        {
            post(where: {
                slug: "${slug}"
            }){
                title,
                postBody{
                    raw
                }
            }
        }
        `
    )

    return { post: post }
}

export default Article