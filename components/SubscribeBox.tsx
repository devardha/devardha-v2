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
    form input{
        font-size: 14px;
    }

    @media(min-width:512px){
        form input{
            font-size: 16px;
        }
    }
`
    
export default SubscribeBox