import styled from '@emotion/styled'
import { GraphQLClient } from 'graphql-request';
import Head from 'next/head';
import Layout from '../components/Layout';
import Post from '../components/Post';
import SubscribeBox from '../components/SubscribeBox';

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
            <Layout title="DevArdha Blog | Full Stack Web Developer">
                <Head>
                    <meta property="og:title" content="Dev Ardha Personal Blog" />
                    <meta property="og:url" content="https:devardha.vercel.app" />
                    <meta property="og:description" content="Personal Blog milik Dev Ardha, Full Stack Web Developer" />
                    <meta property="og:image" content="https://avatars2.githubusercontent.com/u/59217768?s=460&u=50eeaffa0e1ec4afc5e16c991ed85db955b7dc2b&v=4" />

                    <meta property="twitter:card" content="summary"/>
                    <meta property="twitter:title" content="Dev Ardha Personal Blog"/>
                    <meta property="twitter:description" content="Personal Blog milik Dev Ardha, Full Stack Web Developer"/>
                    <meta property="twitter:url" content="https:devardha.vercel.app"/>
                    <meta property="twitter:image" content="https://avatars2.githubusercontent.com/u/59217768?s=460&u=50eeaffa0e1ec4afc5e16c991ed85db955b7dc2b&v=4"/>
                </Head>
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
                <div className="wrapper">
                    <SubscribeBox/>
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
            margin-top:7rem;
        }
    }
`

export async function getStaticProps() {
    const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS)

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