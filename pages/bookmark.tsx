import { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
import { request, gql } from 'graphql-request'
import Link from 'next/link'
    
const Bookmark = () => {
    const [bookmarkList, setBookmarkList] = useState([])

    const limitCharacter = (text: any, count: number) => {
        if(!text){
            return ''
        }else{
            return text.slice(0, count) + (text.length > count ? "..." : "");
        }
    }

    useEffect(() => {
        const saved = localStorage.getItem('bookmarked')
        const savedList = JSON.parse(saved)
        if(saved && savedList.length > 0){
            const arrayQuery = []
            savedList.map(slug => {
                arrayQuery.push({slug_contains: slug})
            })
            const stringified = JSON.stringify(arrayQuery)
            const formatedQuery = stringified.replace(/"([^"]+)":/g, '$1:');

            const query = gql`
            {
                posts(
                    where: { OR: ${formatedQuery} }
                ) {
                    title,
                    slug,
                    image,
                    article
                }
            }
            `
    
            request('https://api-ap-northeast-1.graphcms.com/v2/ckibuuti2cx3z01z2e430ak7k/master', query).then(res => {
                setBookmarkList(res.posts)
            }).catch(err => console.log(err))
        }
    }, [])

    return (
        <Wrapper>
            <Layout title="Bookmark | devArdha Blog">
                <div className="page-head">
                    <h1>Bookmark</h1>
                </div>
                <div className="page-body">
                    <div className="posts">
                        {
                            bookmarkList.length > 0 ? (
                                <ul>
                                    {
                                        bookmarkList?.map((post, index) => {
                                            return(
                                                <div className="post" key={index}>
                                                    <div className="post-image">
                                                        <img src={post.image} alt={post.title}/>
                                                    </div>
                                                    <div className="post-preview">
                                                        <Link href={post.slug}>
                                                        <div className="postpreview-top">
                                                            <div className="title">{post.title}</div>
                                                            <div className="subtitle">{limitCharacter(post.article, 110)}</div>
                                                        </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                            ) : <p>No Articles to Show</p>
                        }
                    </div>
                </div>
            </Layout>
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`
    .page-head, .page-body{
        max-width:800px;
        padding:0;
    }

    .post{
        display:flex;
        width:100%;
        margin:1.5rem 0;
        height:160px;

        .post-image{
            width:35%;
            height:100%;

            img{
                border-radius:8px 0 0 8px;
            }
        }

        .post-preview{
            width:65%;
            padding:0 1.5rem;
            display:flex;
            flex-direction:column;
            justify-content: center;

            .postpreview-top{
                cursor:pointer;

                &:hover{
                    .title{
                        color: #0e18ff;
                    }
                }
            }

            .title{
                font-weight:bold;
                margin-bottom:8px;
                font-size:1.3rem;
                line-height: 1.8rem;
            }

            .subtitle{
                font-weight:300;
                line-height:1.5rem;
            }
        }
    }

    img{
        width:100%;
        height:100%;
        object-fit:cover;
    }

    @media(min-width:768px){
        .page-head{
            margin-top:6rem;

            h1{
                font-size:2.75rem;
                line-height:3.5rem;
            }
        }
    }
`

export default Bookmark