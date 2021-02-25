import React, { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
import Project from '../components/Project'

const data = [
    {
        site_link: 'https://pixografer.com/',
        sitem_image: '/images/project-pixografer.png',
        project_name: 'Pixografer',
        project_summary: 'Pixografer merupakan sebuah website yang mempertemukan client dan fotografer secara online dengan mudah dan cepat.',
        technology: ['React', 'GraphQL', 'Nextjs', 'Firebase', 'MongoDB']
    },
]

const Projects = ({ projects, tags }) => {

    return (
        <Wrapper>
            <Layout title="Projects | DevArdha Blog">
                <div className="page-head">
                    <h1>Projects</h1>
                </div>
                <div className="page-body">
                    <p>Beberapa proyek yang pernah saya kerjakan</p>
                    <ul className="tags__list">
                        {
                            tags?.map((item, index) => (
                                <button key={index}>{item}</button>
                            ))
                        }
                    </ul>
                    <ul className="project__list">
                        {
                            projects?.map((item, index) => (
                                <Project key={index} item={item}/>
                            ))
                        }
                    </ul>
                </div>
            </Layout>
        </Wrapper>
    );
}
    
const Wrapper = Styled.div`
    .page-head{
        margin-top:8rem;
    }

    .page-body{
        min-height:50vh;

        .tags__list{
            display:flex;
            flex-wrap:wrap;

            button{
                background: var(--label-bg);
                border: 1px solid var(--label-border);
                color:var(--label-text);
                padding: 8px 16px;
                border-radius: 4px;
                margin-right: 8px;
                font-size:.9rem;
                cursor:default;
                margin-bottom:8px;

                &:focus{
                    outline:0;
                }
            }
            .active{
                background:var(--btn-bg);
                color:var(--btn-text);

                &:hover{
                    border-color:var(--btn-bg);
                }
            }
        }

        .project__list{
            display:grid;
            grid-template-columns:1fr;
            grid-gap:1.5rem;
            margin-top:2rem;

            li{
                .project__image{
                    width:100%;
                    height:240px;
                    background:#eee;
                    border-radius:8px;
                    overflow:hidden;
                    position: relative;

                    img{
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    }
                }

                .project__name{
                    font-weight: bold;
                    font-size: 1.25rem;
                    margin-top: 1rem;
                    color:var(--color);
                }
                
                .project__summary{
                    color:var(--color);
                }
            }
        }
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

            .project__list{
                grid-template-columns:1fr 1fr;
            }
        }
    }
`

Projects.getInitialProps = async () => {
    const tagWrapper = []
    data.map(item => {
        tagWrapper.push(...item.technology)
    })

    const tags = tagWrapper.reduce((a, b) => {
        if(a.indexOf(b) < 0) a.push(b)

        return a
    }, [])

    return { projects: data, tags }
}

export default Projects