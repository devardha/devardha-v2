import React from 'react'
import Styled from '@emotion/styled'
import Head from 'next/head'
import Navbar from './Navbar'
    
const Layout = ({ children, title }) => {
    return (
        <Wrapper>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="robots" content="index,follow"/>
                <meta name="googlebot" content="index,follow"/>
                <title>{title}</title>
            </Head>
            <Navbar/>
            {children}
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`

`
    
export default Layout