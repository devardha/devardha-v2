import React from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoMdMoon } from 'react-icons/io'
    
const Navbar = () => {
    const router = useRouter()

    return (
        <Wrapper>
            <ul>
                <span className="dark-mode"><IoMdMoon/></span>
                <div className="list">
                    <Link href="/"><li className={router.pathname === '/' ? 'active' : ''}>Home</li></Link>
                    <Link href="/about"><li className={router.pathname === '/about' ? 'active' : ''}>About</li></Link>
                    <Link href="/bookmark"><li className={router.pathname === '/bookmark' ? 'active' : ''}>Bookmark</li></Link>
                </div>
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

    .dark-mode{
        background-color: #EDF2F7;
        padding: 12px;
        display: flex;
        border-radius: 4px;
        cursor:pointer;

        &:hover{
            background-color: #e7eef5;
        }
    }

    .list{
        display:flex;
        margin-left: auto;
        align-items: center;
    }

    ul{
        display:flex;
        justify-content:flex-start;
        width:100%;
        max-width:800px;
        margin:0 auto;
        
        li{
            color:#000;
            margin-left:1.5rem;
            cursor:pointer;
            
            &:hover{
                color:#0e18ff;
            }
        }

        .active{
            color:#0e18ff;
            font-weight: 600;
        }
    }

    @media(min-width:768px){
        ul{
            li{
                margin-left:2rem;
            }
        }
    }
`
    
export default Navbar