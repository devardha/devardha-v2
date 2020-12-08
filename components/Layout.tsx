import React from 'react'
import Styled from '@emotion/styled'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
    
const Layout = ({ children, title }) => {
    return (
        <Wrapper>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="description" content="Personal blog milik Ardha Yudhatama (devardha), berisi pemikiran tentang web development, programming, dan teknologi." />
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

`
    
export default Layout