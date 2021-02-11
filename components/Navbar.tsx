import React from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoMdMoon } from 'react-icons/io'
import { HiSun } from 'react-icons/hi'
import { useTheme } from 'next-themes'
    
const Navbar = () => {
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    return (
        <Wrapper>
            <ul>
                <span className="dark-mode" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'light' ? <IoMdMoon/> : <HiSun/>}</span>
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
    background:var(--nav-background);
    backdrop-filter:saturate(180%) blur(20px);
    top: 0;

    .dark-mode{
        background-color: var(--btn-bg);
        color:var(--color);
        padding: 12px;
        display: flex;
        border-radius: 4px;
        cursor:pointer;

        &:hover{
            background-color: var(--btn-bg-hover);
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
            color:var(--color);
            margin-left:1.5rem;
            cursor:pointer;
            
            &:hover{
                color:#ff397a;
            }
        }

        .active{
            color:#ff397a;
            font-weight: 600;
        }
    }

    @media(min-width:768px){
        padding: 1.5rem;

        ul{
            li{
                margin-left:2rem;
            }
        }
    }
`
    
export default Navbar