import { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
import { request, gql } from 'graphql-request'
import Post from '../components/Post'
    
const Bookmark = () => {
    const [bookmarkList, setBookmarkList] = useState([])

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
                    article,
                    createdAt,
                    description
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
                                                <Post post={post} key={index}/>
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
        padding: 0 1.5rem;
    }

    .page-head{
        margin-top: 6rem;
    }

    @media(min-width:768px){
        .posts{
            padding: 0;
        }

        .page-head{
            padding:0;

            h1{
                font-size:2.75rem;
                line-height:3.5rem;
            }
        }

        .page-body{
            padding:0;
        }
    }
`

export default Bookmark