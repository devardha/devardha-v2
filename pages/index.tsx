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
                <div className="post">
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
    .post{
        width:100%;
        max-width:800px;
        margin:0 auto;
        height:400px;
        margin-top:6rem;
    }
`

export async function getStaticProps() {
    const graphcms = new GraphQLClient('https://api-ap-northeast-1.graphcms.com/v2/ckibuuti2cx3z01z2e430ak7k/master')

    const { posts } = await graphcms.request(
        `
        {
            posts{
                title,
                postBody{
                    raw
                },
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