import { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import { format } from 'date-fns'
import Link from 'next/link'
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md'
    
const Post = ({ post }) => {
    const [bookmarkList, setBookmarkList] = useState([])
    const dateFormatter = (date) => {
        return format(new Date(date), "MMMM dd, yyy")
    }

    const limitCharacter = (text: any, count: number) => {
        if(!text){
            return ''
        }else{
            return text.slice(0, count) + (text.length > count ? "..." : "");
        }
    }

    const saveToLocalStorage = (arr) => {
        localStorage.setItem('bookmarked', JSON.stringify(arr))
    }

    const removeBookmark = (slug) => {
        const saved = localStorage.getItem('bookmarked')
        const arr = JSON.parse(saved)
        const removed = arr.filter(item => item !== slug)
        setBookmarkList(removed)
        saveToLocalStorage(removed)
    }

    const checkBookmark = (slug) => {
        if(bookmarkList.includes(slug)){
            return true
        }else{
            return false
        }
    }

    useEffect(() => {
        const saved = localStorage.getItem('bookmarked')
        if(!saved){
            saveToLocalStorage([])
        }
        if(saved){
            setBookmarkList(JSON.parse(saved))
        }
    }, [])

    const bookmark = (slug) => {
        const saved = localStorage.getItem('bookmarked')
        const wrapper = JSON.parse(saved)
        wrapper.push(slug)
        setBookmarkList(wrapper)
        saveToLocalStorage(wrapper)
    }

    return (
        <Wrapper>
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
                <div className="postpreview-bottom">
                    <div className="post-detail">
                        <div className="user-profile">
                            <img src="https://avatars2.githubusercontent.com/u/59217768?s=460&u=50eeaffa0e1ec4afc5e16c991ed85db955b7dc2b&v=4" alt="devardha profile"/>
                        </div>
                        <div className="user-detail">
                            <div className="user-name">{post.writer}</div>
                            <div className="date-published">{dateFormatter(post.createdAt)}</div>
                        </div>
                        <span className={`bookmark ${checkBookmark(post.slug) ? 'bookmarked' : ''}`} onClick={() => {checkBookmark(post.slug) ? removeBookmark(post.slug) : bookmark(post.slug)}}>{ checkBookmark(post.slug) ? <MdBookmark/> : <MdBookmarkBorder/> }</span>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
    
const Wrapper = Styled.li`
    width:100%;
    border-radius:8px;
    margin:1.5rem 0;
    display:flex;
    flex-direction: column;

    img{
        width:100%;
        height:100%;
        object-fit:cover;
    }

    .post-image{
        width:100%;
        height:210px;

        img{
            border-radius:8px 8px 0 0;
        }
    }

    .post-preview{
        width:100%;
        padding:1rem 0 1.5rem 0;
        display:flex;
        flex-direction:column;
        justify-content: space-between;

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

    .post-detail{
        display:flex;
        margin-top:1rem;
        align-items:center;

        .user-profile{
            height:35px;
            width:35px;
            background-color:#eee;
            margin-right:1rem;
            border-radius:50%;

            img{
                border-radius:50%;
            }
        }

        .user-detail{
            display:flex;
            flex-direction:column;
            font-weight:400;

            .user-name{
                margin-bottom:4px;
                font-weight:bold;
                font-size:.9rem;
            }

            .date-published{
                font-size:.8rem;
            }
        }

        .bookmark{
            display: flex;
            border-radius: 50%;
            margin-left: auto;
            font-size: 1.75rem;
            cursor:pointer;
            color:#aaa;
        }

        .bookmarked{
            color:#0e18ff;;
        }
    }

    @media(min-width:768px){
        flex-direction: row;
        height:220px;

        .post-image{
            width:35%;
            height:100%;

            img{
                border-radius:8px 0 0 8px;
            }
        }
        .post-preview{
            width:65%;
            padding:1.5rem;
        }
    }
`
    
export default Post