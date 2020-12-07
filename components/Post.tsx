import React from 'react'
import Styled from '@emotion/styled'
import { format } from 'date-fns'
import Link from 'next/link'
    
const Post = ({ post }) => {
    const dateFormatter = (date) => {
        return format(new Date(date), "MMMM dd, yyy")
    }

    const limitCharacter = (text: string, count: number) => {
        return text.slice(0, count) + (text.length > count ? "..." : "");
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
                    <div className="subtitle">{limitCharacter(post.postBody.raw.children[0].children[0].text, 110)}</div>
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
        height:100%;

        img{
            border-radius:8px 8px 0 0;
        }
    }

    .post-preview{
        width:100%;
        padding:1.5rem 0;
        display:flex;
        flex-direction:column;
        justify-content: space-between;

        .postpreview-top{
            cursor:pointer;
        }

        .title{
            font-weight:bold;
            margin-bottom:8px;
            font-size:1.3rem;
            line-height: 2rem;
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
            font-size:.9rem;
            font-weight:400;

            .user-name{
                margin-bottom:4px;
                font-weight:bold;
            }
        }
    }

    @media(min-width:768px){
        flex-direction: row;
        height:220px;

        .post-image{
            width:35%;

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