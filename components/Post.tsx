import { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md'
import { dateFormatter } from '../utils/date'
import { limitCharacter, readTime } from '../utils/post'
import { saveToLocalStorage, bookmark, checkBookmark, removeBookmark } from '../utils/bookmark'
    
const Post = ({ post }) => {
    const [bookmarkList, setBookmarkList] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('bookmarked')
        if(!saved){
            saveToLocalStorage([])
        }
        if(saved){
            setBookmarkList(JSON.parse(saved))
        }
    }, [])

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
                        <div className="post-feature">
                            <span className="readtime">{readTime(post.article)} Min Read</span>
                            <span className={`bookmark ${checkBookmark(post.slug, bookmarkList) ? 'bookmarked' : ''}`} onClick={() => {checkBookmark(post.slug, bookmarkList) ? removeBookmark(post.slug, setBookmarkList) : bookmark(post.slug, setBookmarkList)}}>{ checkBookmark(post.slug, bookmarkList) ? <MdBookmark/> : <MdBookmarkBorder/> }</span>
                        </div>
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
                    color: #ff397a;
                }
            }
        }

        .title{
            font-weight:bold;
            margin-bottom:8px;
            font-size:1.3rem;
            line-height: 1.8rem;
            color:var(--color);
        }

        .subtitle{
            font-weight:300;
            line-height:1.5rem;
            color:var(--color);
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
            color:var(--color);

            .user-name{
                margin-bottom:4px;
                font-weight:bold;
                font-size:.9rem;
            }

            .date-published{
                font-size:.8rem;
            }
        }

        .post-feature{
            margin-left: auto;
            display: flex;
            align-items:center;

            .readtime{
                margin-right:8px;
                color:var(--color-light);
                font-size:.9rem;
            }

            .bookmark{
                display: flex;
                border-radius: 50%;
                font-size: 1.75rem;
                cursor:pointer;
                color:var(--color-light);
            }
        }

        .bookmarked{
            color:#ff397a !important;
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
            padding:1.5rem 0 1.5rem 1.5rem;
        }
    }
`
    
export default Post