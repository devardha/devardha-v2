import Styled from '@emotion/styled'
import { useState } from 'react';
import { formatDistance } from 'date-fns'
    
const CommentBox = ({ comments, postComment, postReply, replyOpen, setReplyOpen, totalComment }) => {
    const [commentOpen, setCommentOpen] = useState(false)
    const google = <svg viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/><path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/></svg>

    const getDate = (timestamp) => {
        return formatDistance(
            new Date(timestamp),
            new Date,
            { addSuffix: true }
        )
    }

    return (
        <StyledComponent>
            <div className="box__head">
                {totalComment ? totalComment : 'No'} Comments
            </div>
            <div className="box__body">
                {
                    comments.length > 0 ? (
                        comments?.map((item, index) => (
                            <div key={index}>
                            <div className={`comment__template comment__list`}>
                                <div className="comment__left">
                                    <div className="avatar">
                                        { item.avatar ? <img src={item.avatar} alt=""/> : <span>{item.name.charAt(0).toUpperCase()}</span> }
                                    </div>
                                </div>
                                <div className="comment__right">
                                    <p><span>{item.name}</span> {item.text}</p>
                                    <div className="comment__actions">
                                        <span className="button-reply" onClick={() => setReplyOpen(item.id)}>Reply</span>
                                        <span>•</span>
                                        <span className="date">{getDate(item.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                            { item.replies.length > 0 && (
                                item.replies.map((reply, index) => (
                                    <div className={`comment__template comment__list is-reply`} key={index}>
                                        <div className="comment__left">
                                            <div className="avatar">
                                                { reply.avatar ? <img src={reply.avatar} alt=""/> : <span>{reply.name.charAt(0).toUpperCase()}</span> }
                                            </div>
                                        </div>
                                        <div className="comment__right">
                                            <p><span>{reply.name}</span> {reply.text}</p>
                                            <div className="comment__actions">
                                                {/* <span className="button-reply">Reply</span>
                                                <span>•</span> */}
                                                <span className="date">{getDate(reply.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) }
                            {
                                replyOpen === item.id && (
                                    <div className="comment__template comment__box comment__reply">
                                        {/* <div className="comment__left">
                                            <div className="avatar">
                                                <img src="https://avatars2.githubusercontent.com/u/59217768?s=460&u=50eeaffa0e1ec4afc5e16c991ed85db955b7dc2b&v=4" alt=""/>
                                            </div>
                                        </div> */}
                                        <form className="comment__right" onSubmit={postReply}>
                                            { commentOpen && <input type="text" placeholder="Enter your name" name="name"/> }
                                            <textarea name="text" id="text" placeholder="Type here to reply" onFocus={() => setCommentOpen(true)}></textarea>
                                            <div className="buttons">
                                                <button>Send</button>
                                                <span onClick={() => setReplyOpen(null)}>Cancel</span>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }
                            </div>
                        ))
                    ) : <p className="no-comment">There are no comments yet</p>
                }
                {
                    replyOpen === null && (
                        <div className="comment__template comment__box">
                            <form className="comment__right" onSubmit={postComment}>
                                { commentOpen && <input type="text" placeholder="Enter your name" name="name"/> }
                                <textarea name="text" id="text" placeholder="Type here to comment" onFocus={() => setCommentOpen(true)}></textarea>
                                <div className="buttons">
                                    <button>Send</button>
                                </div>
                            </form>
                        </div>
                    )
                }
            </div>
        </StyledComponent>
    );
}
    
const StyledComponent = Styled.div`
    width:100%;
    margin-top:4rem;
    padding-top:2rem;

    .box__head{
        margin-bottom:2rem;
        font-size:1.5rem;
        font-weight:bold;
        color:var(--color);
    }

    .box__body{
        display:flex;
        flex-direction:column;
        font-size:.9rem;
        position:relative;

        .comment__template{
            display:flex;
            margin-bottom:1rem;

            .comment__left{
                margin-right:1.5rem;

                .avatar{
                    width:40px;
                    height:40px;
                    overflow:hidden;
                    border-radius:50%;
                    background:#9a86fd;
                    display:flex;
                    align-items:center;
                    justify-content:center;

                    img{
                        height:100%;
                        width:100%;
                        object-fit:cover;
                    }

                    span{
                        font-size:1.25rem;
                        font-weight:bold;
                        color:white;
                        transform:translateY(-2px);
                    }
                }

                @media(max-width:520px){
                    margin-right:1rem;

                    .avatar{
                        width:32px;
                        height:32px;

                        span{
                            font-size:1rem;
                        }
                    }
                }
            }

            .comment__right{
                flex-grow:1;

                p{
                    margin:0;

                    span{
                        font-weight:bold;
                    }
                }

                input{
                    width:100%;
                    padding:0 1rem;
                    border:1px solid var(--input-border);
                    border-radius:8px;
                    height:35px;
                    margin-bottom:8px;
                    outline:0;
                    background:var(--input-bg);
                    color:var(--color);

                    &:hover{
                        outline:0;
                    }

                    &::placeholder{
                        color:var(--input-placeholder);
                    }
                }
                textarea{
                    min-height:100px;
                    width:100%;
                    padding:1rem;
                    resize:none;
                    border:1px solid var(--input-border);
                    border-radius:8px;
                    outline:0;
                    background:var(--input-bg);
                    color:var(--color);

                    &:hover{
                        outline:0;
                    }

                    &::placeholder{
                        color:var(--input-placeholder);
                    }
                }

                .comment__actions{
                    margin-top:8px;

                    span{
                        color:#777;
                    }
                }

                .button-reply, .date{
                    font-size:14px;
                    cursor:pointer;

                    &:hover{
                        color:var(--color-link)
                    }
                }

                .button-reply{
                    margin-right:.5rem;
                }

                .date{
                    margin-left:.5rem;
                }

                .buttons{
                    display:flex;
                    justify-content:flex-start;
                    align-items:center;
                    margin-top:1rem;

                    button{
                        margin-right:1rem;
                        background:var(--btn-bg);
                        padding:8px 16px;
                        color:white;
                        font-weight:bold;
                        border-radius:4px;
                        border:0;

                        &:hover{
                            background:var(--btn-bg-hover);
                        }
                    }

                    span{
                        cursor:pointer;
                        color:var(--color-link);

                        &:hover{
                            color:var(--color-link);
                        }
                    }

                    .google-login{
                        margin-left:auto;
                        margin-right:0;
                        display: flex;
                        justify-content:space-between;
                        align-items:center;
                        background:#fff;
                        border:1px solid #DBDFE4;
                        color:#777;

                        i{
                            width:15px;
                            margin-left:8px;

                            svg{
                                width:100%;
                            }
                        }
                    }
                }
            }
        }

        .comment__box{
            margin-top:2rem;
        }

        .comment__reply{
            padding-left: 4rem;
        }

        @media(max-width:520px){
            .comment__box{
                .comment__left{
                    display:none;
                }
            }
        }

        .no-comment{
            text-align:center;
        }

        .is-reply{
            padding-left: 4rem;
            margin-bottom:1.5rem;

            .comment__right .comment__actions span{
                margin-left:0;
            }
        }
    }
`
    
export default CommentBox