import React, { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
import algoliasearch from 'algoliasearch/lite';
import { PoweredBy, InstantSearch } from 'react-instantsearch-dom'

const searchClient = algoliasearch(
    'JWO31IZFSL',
    '2c34f4e15bf18f992cb1337cafa38a4d'
);

const Projects = () => {
    return (
        <InstantSearch
        indexName="posts"
        searchClient={searchClient}>
            <Wrapper>
                <Layout title="Search | DevArdha Blog">
                    <div className="page-head">
                        <h1>Search</h1>
                    </div>
                    <div className="page-body">
                        <p>Cari artikel yang kamu sukai!</p>
                        <div className="searchbox">
                            <input type="text" placeholder="Search here..."/>
                            <PoweredBy
                                translations={{
                                    searchBy: 'Powered by',
                                }}
                            />
                        </div>
                    </div>
                </Layout>
            </Wrapper>
        </InstantSearch>
    );
}
    
const Wrapper = Styled.div`
    .page-head{
        margin-top:8rem;
    }

    .page-body{
        min-height:50vh;

        .searchbox{
            input{
                padding: 1rem 2rem;
                width: 100%;
                border-radius: 4px;
                border: 1px solid var(--input-border);
                background:var(--input-bg);

                &::placeholder{
                    color:var(--input-placeholder)
                }

                &:focus{
                    outline:0;
                }
            }

            .ais-PoweredBy{
                font-size: .9rem;
                display: flex;
                justify-content: flex-end;
                margin-top: 7px;
            }
            .ais-PoweredBy-text{
                margin-right: 8px;
                color:var(--color);
            }
            a{
                transform: translateY(-2px);

                svg{
                    width: 4rem;
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
        }
    }
`

export default Projects