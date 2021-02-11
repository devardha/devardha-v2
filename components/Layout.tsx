import React from 'react'
import Styled from '@emotion/styled'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

interface Lays {
    children: any,
    title: string,
    description?: string
}

const Layout = ({ children, title, description }: Lays) => {
    return (
        <Wrapper>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="description" content={description || "Personal blog milik Ardha Yudhatama (devardha), berisi pemikiran tentang web development, programming, dan teknologi."} />
                <meta name="keywords" content="devardha, ardha yudhatama, cara membuat website, web programming, programming blog, web development, tutorial membuat website, tutorial nextjs, tutorial react, tutorial graphql"/>
                <meta name="locale" content="id"/>
                <meta name="robots" content="index,follow"/>
                <meta name="googlebot" content="index,follow"/>
                <title>{title}</title>
            </Head>
            <Navbar/>
            {children}
            
            <Footer/>
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`
    .wrapper{
        width:100%;
        max-width:800px;
        margin:0 auto;
        padding: 0 1.5rem;
    }

    @media(min-width:1024px){
        .wrapper{
            padding: 0;
        }
    }

    .news-letter{
        width:100%;
        min-height:200px;
        background: var(--newsletter-bg);
        border: 1px solid var(--newsletter-border);
        border-radius:8px;
        margin-top:4rem;
        padding:2rem 1.5rem;
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
        }

        input{
            height:60px;
            padding:0 1.5rem;
            width:100%;
            border-radius:8px;
            font-weight:300;
            font-size:1rem;
            border:0;
            background:var(--newsletter-input);
            color:var(--color);

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
            right:1.5rem;
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
`
    
export default Layout