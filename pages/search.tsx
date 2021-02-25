import React, { useState } from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom'
import Hits from '../components/Hits';
import { connectInfiniteHits, connectSearchBox } from 'react-instantsearch-dom'
import SearchBox from '../components/SearchBox';
import RefinementList from '../components/RefinementList';

const searchClient = algoliasearch(
    'JWO31IZFSL',
    '2c34f4e15bf18f992cb1337cafa38a4d'
);

const CustomInfiniteHits = connectInfiniteHits(Hits);
const CustomSearchBox = connectSearchBox(SearchBox)

const Projects = () => {
    const [tags, setTags] = useState([])
    const [filters, setFilters] = useState([])

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
                        <CustomSearchBox/>
                        <div className="page__content">
                            <CustomInfiniteHits setTags={setTags} filters={filters}/>
                            <div className="sidebar">
                                <RefinementList items={tags} filters={filters} setFilters={setFilters}/>
                            </div>
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

        .page__content{
            display:flex;
            justify-content:space-between;
            flex-direction: column;
            margin-top: 1rem;

            .sidebar{
                width:100%;
                display:flex;
                flex-direction:column;
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

            .page__content{
                flex-direction: row;

                .sidebar{
                    width:33%;
                }
            }
        }
    }
`

export default Projects