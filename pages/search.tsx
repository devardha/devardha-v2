import React, { useState } from 'react'
import Styled from '@emotion/styled'
import Layout from '../components/Layout'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom'
import { GraphQLClient } from 'graphql-request';
import InfiniteHits from '../components/InfiniteHits';
import { connectInfiniteHits, connectSearchBox } from 'react-instantsearch-dom'
import SearchBox from '../components/SearchBox';
import RefinementList from '../components/RefinementList';

const searchClient = algoliasearch(
    'JWO31IZFSL',
    '2c34f4e15bf18f992cb1337cafa38a4d'
);

const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);
const CustomSearchBox = connectSearchBox(SearchBox)

const Search = ({ posts }) => {
    const [tags, setTags] = useState([])
    const [filters, setFilters] = useState([])
    const [query, setQuery] = useState('')
    
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
                        <CustomSearchBox setQuery={setQuery}/>
                        <div className="page__content">
                            {
                                query.length === 0 ? (
                                    <InfiniteHits hits={posts} setTags={setTags} filters={filters} isAlgolia={false}/>
                                ) : <CustomInfiniteHits setTags={setTags} filters={filters} isAlgolia={true}/>
                            }
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

Search.getInitialProps = async () => {
    const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS)
    const { posts } = await graphcms.request(
        `
        {
            posts(stage: PUBLISHED){
                title,
                article,
                slug,
                image,
                writer,
                createdAt,
                tags{
                    tagName
                }
            }
        }
        `
    )

    const formatedList = []
    posts?.map(item => {
        const tagList = []
        item.tags.map(tag => {
            tagList.push(tag.tagName)
        })

        formatedList.push({
            title: item.title,
            article: item.article,
            slug: item.slug,
            image: item.image,
            writer: item.writter,
            createdAt: item.createdAt,
            tags: tagList
        })
    })
    
  
    return {
        posts: formatedList
    };
}

export default Search