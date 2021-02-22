import React from 'react'
import Styled from '@emotion/styled'
import SpotifyWidget from './SpotifyWidget'

const Footer = () => {
    return (
        <Wrapper>
            <SpotifyWidget/>
            <div className="credits">
                <p>Made with ❤️ by devardha</p>
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

    .credits{
        width:100%;
        display:flex;
        justify-content:center;
    }

    @media(min-width:768px){
        padding: 2rem 0 2rem 0;
    }
`
    
export default Footer