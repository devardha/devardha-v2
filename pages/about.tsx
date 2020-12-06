import React from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
    
const About = () => {
    return (
        <Wrapper>
            <Layout>
                <div className="page-head">
                    <h1>About</h1>
                    <div className="author-detail">
                        <div className="user-profile">
                            <img src="https://avatars2.githubusercontent.com/u/59217768?s=460&u=50eeaffa0e1ec4afc5e16c991ed85db955b7dc2b&v=4" alt="devardha profile"/>
                        </div>
                        <span>devardha</span>
                        <span className="date">December 05, 2020</span>
                    </div>
                </div>
                <div className="page-body">
                    <p>Nama Saya Yudhatama Indra Wardhana. Saya seorang Full-Stack Web Developer. Saya seorang mahasiswa yang sekarang sedang berkuliah semester dua di jurusan Teknik Informatika Universitas Semarang.</p>
                    <p>Masuk ke dunia pemrograman sejak lulus sma, PHP menjadi bahasa pertama saya. Namun saya kemudian jatuh cinta dengan JavaScript dan mulai mendalami dunia front-end web development dan kemudian berkenalan dengan React.js. Kini saya mencoba menambah skill saya dengan belajar Node.js dan Deno untuk melengkapi tech stack saya sebagai seorang Full-Stack Javascript Developer</p>
                </div>
            </Layout>
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`
    .page-head{
        max-width:700px;
        margin:0 auto;
        margin-bottom:2rem;
        margin-top:4rem;

        h1{
            font-size:2.75rem;
            margin:0;
            margin-bottom:1rem;
        }
    }

    .page-body{
        max-width:700px;
        margin:0 auto;

        p{
            font-size:1.1rem;
            line-height:1.75rem;
        }
    }

    .user-profile{
        height:30px;
        width:30px;
        background-color:#eee;
        margin-right:1rem;
        border-radius:50%;

        img{
            border-radius:50%;
            height:100%;
            width:100%;
        }
    }

    .author-detail{
        display:flex;
        align-items:center;
        font-size:.9rem;

        .date{
            color:#777;
            margin-left:1rem;
        }
    }
`
    
export default About