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
`
    
export default Layout