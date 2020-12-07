import React from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
    
const Navbar = () => {
    const router = useRouter()

    return (
        <Wrapper>
            <ul>
                <Link href="/"><li className={router.pathname === '/' ? 'active' : ''}>Home</li></Link>
                <Link href="/about"><li className={router.pathname === '/about' ? 'active' : ''}>About</li></Link>
                <Link href="/bookmark"><li className={router.pathname === '/bookmark' ? 'active' : ''}>Bookmark</li></Link>
            </ul>
        </Wrapper>
    );
}
    
const Wrapper = Styled.nav`
    width:100%;
    display:flex;
    justify-content:center;
    margin-bottom:2rem;
    align-items: center;
    padding: 2rem 1.5rem;
    position: fixed;
    z-index: 1;
    background: #fff;
    top: 0;

    ul{
        display:flex;
        justify-content:flex-start;
        width:100%;
        max-width:800px;
        margin:0 auto;
        
        li{
            color:#000;
            margin-right:2rem;
            cursor:pointer;
            
            &:hover{
                color:#0e18ff;
            }
        }

        .active{
            color:#0e18ff;
        }
    }
`
    
export default Navbar