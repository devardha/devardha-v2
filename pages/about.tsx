import React from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
    
const About = () => {
    return (
        <Wrapper>
            <Layout title="About | DevArdha Blog">
                <div className="page-head">
                    <h1>About</h1>
                </div>
                <div className="page-body">
                    <p>Hai, nama saya Ardha. Saya seorang Fullstack Web Developer sekaligus blogger yang biasa menulis di blog ini dan juga <a href="http://ardhayudhatama.com">ardhayudhatama.com</a>. Saya tinggal di Kota Semarang, Indonesia, dan sedang menempuh kuliah di jurusan Teknik Informatika Universitas Semarang.</p>
                    <p>Saya biasa berurusan dengan website dan teknologi-teknologi yang berada di sekitarnya. Keahlian saya ada di Reactjs dan Node.js. Bahasa favorit saya adalah Javascript, walaupun sekarang saya lebih sering menulis menggunakan Typescript.</p>
                </div>
            </Layout>
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`
    .page-body{
        min-height:50vh;
    }

    .page-head{
        margin-top:8rem;
    }

    @media(min-width:768px){
        .page-head{
            h1{
                font-size:2.75rem;
                line-height:3.5rem;
            }
        }
        .page-body{
            font-size: 1.5rem;
        }
    }
`
    
export default About