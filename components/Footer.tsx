import React from 'react'
import Styled from '@emotion/styled'
import SpotifyWidget from './SpotifyWidget'
import Link from 'next/link'

const Footer = () => {
    return (
        <Wrapper>
            <SpotifyWidget/>
            <div className="footer__content">
                <Link href="/bookmark"><span>Bookmarks</span></Link>
                <Link href="/search"><span>Search</span></Link>
                <Link href="/about"><span>Contact</span></Link>
                <Link href="https://github.com/devardha"><span>GitHub</span></Link>
            </div>
        </Wrapper>
    );
}
    
const Wrapper = Styled.footer`
    width:100%;
    max-width:800px;
    padding: 2rem 1.5rem;
    margin:0 auto;
    margin-top:4rem;
    display:flex;
    justify-content:center;
    flex-direction:column;

    .footer__content{
        width:100%;
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        padding:1rem 0;
    }

    span{
        margin-left:1rem;
        margin-right:1rem;
        cursor:pointer;
        color:var(--color);

        &:hover{
            color:var(--color-link-hover);
        }
    }

    @media(min-width:768px){
        padding: 2rem 0 2rem 0;
    }
`
    
export default Footer