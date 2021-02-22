import React from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
    
const Projects = () => {
    return (
        <Wrapper>
            <Layout title="About | DevArdha Blog">
                <div className="page-head">
                    <h1>Projects</h1>
                </div>
                <div className="page-body">
                    
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

    .page-body{
        min-height:50vh;
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
    
export default Projects