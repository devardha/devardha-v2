import React from 'react'
import Styled from '@emotion/styled'
    
const Navbar = () => {
    return (
        <Wrapper>
            <ul>
                <li className="active">Home</li>
                <li>Portfolio</li>
                <li>About</li>
            </ul>
        </Wrapper>
    );
}
    
const Wrapper = Styled.nav`
    width:100%;
    display:flex;
    justify-content:center;
    margin:0 auto;
    margin-bottom:2rem;
    max-width:800px;
    align-items: center;

    ul{
        display:flex;
        justify-content:center;
        width:100%;
        margin:0 auto;
        
        li{
            color:#000;
            margin-left:1rem;
            padding:1rem .5rem;
            cursor:pointer;
            
            &:hover{
                text-decoration:underline;
            }
        }
    }
`
    
export default Navbar