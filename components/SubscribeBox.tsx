import Styled from '@emotion/styled'
import { useRef, useState } from 'react'

const SubscribeBox = () => {
    const inputRef = useRef(null);
    const [message, setMessage] = useState('');
    
    const subscribe = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/subscribe', {
            body: JSON.stringify({
                email: inputRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
                method: 'POST'
        });

        const { error } = await res.json();

        if (error) {
            console.log(error)
            return;
        }

        inputRef.current.value = '';
    }

    return (
        <StyledComponent>
            <div className="news-letter">
                <h2>Join the newsletter</h2>
                <p>Subscribe to our newsletter and get an email when there's a new post!</p>
                <form onSubmit={subscribe}>
                    <input type="text" placeholder="Enter your email" ref={inputRef}/>
                    <button className="subscribe-button">Subscribe</button>
                </form>
            </div>
        </StyledComponent>
    );
}
    
const StyledComponent = Styled.div`
    .news-letter{
        width:100%;
        min-height:200px;
        background: var(--newsletter-bg);
        border: 1px solid var(--newsletter-border);
        border-radius:8px;
        margin-top:4rem;
        padding:1.5rem;
        display:flex;
        flex-direction:column;
        justify-content:center;

        form{
            position:relative;
            display:flex;
            align-items:center;
        }

        h2{
            margin:0;
            color:var(--newsletter-heading);
        }

        p{
            margin: 1rem 0;
            font-weight: 300;
            line-height: 1.5rem;
            color:var(--color);
            font-size:.9rem;
        }

        input{
            height:60px;
            padding:0 1rem;
            width:100%;
            border-radius:8px;
            font-weight:300;
            border:0;
            background:var(--newsletter-input);
            color:var(--color);
            font-size:14px;

            &::placeholder{
                color:var(--newsletter-input-placeholder);
                font-weight:300;
            }

            &:focus{
                box-shadow:0 0 16px rgb(0,0,0,0.05);
                outline:0;
            }
        }

        .subscribe-button{
            position:absolute;
            right:1rem;
            padding:12px 16px;
            border-radius:8px;
            background:var(--newsletter-btn-bg);
            color:var(--newsletter-btn-text);
            border:0;
            font-weight:bold;
            transition:all ease-in-out .1s;

            &:active{
                outline:0;
            }

            &:hover{
                background:var(--newsletter-btn-bg-hover);
            }
        }
    }

    @media(min-width:512px){
        .news-letter {
            padding:2rem 1.5rem;

            form input{
                font-size: 16px;
                padding:0 1.5rem;
            }

            form .subscribe-button{
                right:1.5rem;
            }

            p{
                font-size:1rem;
            }
        }
    }
`
    
export default SubscribeBox