import React from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
    
const About = () => {
    return (
        <Wrapper>
            <Layout title="About | DevArdha Blog">
                <div className="page-head">
                    <h1>About</h1>
                    <div className="author-detail">
                        <div className="user-profile">
                            <img src="https://avatars2.githubusercontent.com/u/59217768?s=460&u=50eeaffa0e1ec4afc5e16c991ed85db955b7dc2b&v=4" alt="devardha profile"/>
                        </div>
                        <span className="name">by devardha</span>
                        <span className="date">on December 05, 2020</span>
                    </div>
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
    nav{
        ul{
            max-width:800px !important;
        }
    }

    .page-head{
        margin-top:8rem;
    }

    .author-detail{
        display:flex;
        align-items:center;
        font-size:.9rem;

        .name{
            color:var(--color);
        }

        .date{
            color:var(--color-secondary);
            margin-left:5px;
        }
    }

    @media(min-width:768px){
        .page-head{
            padding:0;

            h1{
                font-size:2.75rem;
                line-height:3.5rem;
            }
        }
        .page-body{
            font-size: 1.5rem;
            padding:0;
        }
    }
`
    
export default About