import React from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

const DynamicMoon = dynamic(() =>
  import('react-icons/io').then((mod) => mod.IoMdMoon)
)

const DynamicSun = dynamic(() =>
  import('react-icons/hi').then((mod) => mod.HiSun)
)
    
const Navbar = () => {
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    return (
        <Wrapper>
            <ul>
                <span className="dark-mode" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme ? theme === 'dark' ? <DynamicSun/> : <DynamicMoon/> : ''}</span>
                <div className="list">
                    <Link href="/"><li className={router.pathname === '/' ? 'active' : ''}>Home</li></Link>
                    <Link href="/about"><li className={router.pathname === '/about' ? 'active' : ''}>About</li></Link>
                    <Link href="/projects"><li className={router.pathname === '/projects' ? 'active' : ''}>Projects</li></Link>
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
    position: fixed;
    z-index: 1;
    background:var(--nav-background);
    backdrop-filter:saturate(180%) blur(20px);
    top: 0;

    .dark-mode{
        background-color: var(--switch-btn-bg);
        color:var(--color);
        padding: 12px;
        display: flex;
        border-radius: 4px;
        height: 40px;
        width: 40px;
        cursor:pointer;

        &:hover{
            background-color: var(--switch-btn-bg-hover);
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
        padding: 2rem 1.5rem;
        
        li{
            color:var(--color);
            margin-left:1.5rem;
            cursor:pointer;
            
            &:hover{
                color:var(--color-link-hover);
            }
        }

        .active{
            color:var(--color-link-active);
            font-weight: 600;
        }
    }

    @media(min-width:768px){
        ul{
            padding: 1.5rem;
            
            li{
                margin-left:2rem;
            }
        }
    }
`
    
export default Navbar