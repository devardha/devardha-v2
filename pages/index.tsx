import styled from '@emotion/styled'
import { GraphQLClient } from 'graphql-request';
import Layout from '../components/Layout';
import Post from '../components/Post';

export default function Home({ posts }) {
    function compare( a, b ) {
        if ( a.createdAt < b.createdAt ){
          return 1;
        }
        if ( a.createdAt > b.createdAt ){
          return -1;
        }
        return 0;
    }

    const sorted = posts?.sort(compare);

    return (
        <Wrapper>
            <Layout title="devArdha Blog | Full Stack Web Developer">
                <div className="posts">
                    <ul>
                        {
                            sorted?.map((post, index) => {
                                return(
                                    <Post post={post} key={index}/>
                                )
                            })
                        }
                    </ul>
                </div>
            </Layout>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .posts{
        width:100%;
        max-width:800px;
        margin:0 auto;
        padding: 0 1.5rem;
        margin-top: 8rem;
    }

    @media(min-width:768px){
        .posts{
            padding: 0;
            margin-top:6rem;
        }
    }
`

export async function getStaticProps() {
    const graphcms = new GraphQLClient('https://api-ap-northeast-1.graphcms.com/v2/ckibuuti2cx3z01z2e430ak7k/master')

    const { posts } = await graphcms.request(
        `
        {
            posts(stage: PUBLISHED){
                title,
                article,
                slug,
                image,
                writer,
                createdAt
            }
        }
        `
    )
  
    return {
        props: {
            posts
        }
    };
}