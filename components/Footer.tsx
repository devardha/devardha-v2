import React from 'react'
import Styled from '@emotion/styled'

const Footer = () => {
    return (
        <Wrapper>
            <p>Made with ❤️ by devardha</p>
        </Wrapper>
    );
}
    
const Wrapper = Styled.footer`
    width:100%;
    max-width:800px;
    padding: 0 1.5rem;
    margin:0 auto;
    margin-top:4rem;
    height:200px;
    display:flex;
    align-items:flex-end;
    justify-content:center;

    p{
        margin-bottom:3rem;
    }

    @media(min-width:768px){
        padding: 0 0;
    }
`
    
export default Footer