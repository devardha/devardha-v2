import Styled from '@emotion/styled'
import { useEffect } from 'react';
import { getUnique } from '../utils/filters';
import { limitCharacter } from '../utils/post';
import { Highlight } from 'react-instantsearch-dom'
    
const InfiniteHits = ({ hits, setTags, filters, isAlgolia }) => {
    const tagFilter = (array, filterList) => {
        if(filterList.length > 0){
            const filtered = []
            array?.map(item => {
                item.tags?.map(tag => {
                    if(filterList?.some(x => x === tag)){
                        filtered.push(item)
                    }
                })
            })
    
            const final = getUnique(filtered, 'slug')
            return final
        }else{
            return array
        }
    }

    useEffect(() => {
        const wrapper = []
        hits?.map(item => {
            if(item.tags?.length > 0){
                wrapper.push(...item.tags)
            }
        })

        const countTags = (array, key) => {
            let counter = 0;
            for (const input of array) {
                if (input.label === key) counter += 1;
            }
        
            return counter;
        }

        const objects = []
        wrapper?.map(tag => {
            objects.push({
                label: tag,
            })
        })

        const tagList = []
        objects?.map(tag => {
            tagList.push({
                label: tag.label,
                count: countTags(objects, tag.label)
            })
        })

        const finalTagList = getUnique(tagList, 'label')

        setTags(finalTagList)
    }, [hits])

    return (
        <StyledComponent>
            {
                tagFilter(hits, filters)?.map((item, index) => (
                    <li key={index}>
                        <div className="hits__image">
                            <img src={item.image} alt={item.title}/>
                        </div>
                        <div className="hits__details">
                            <div className="hits__title">
                                {
                                    isAlgolia ? (
                                        <Highlight attribute={"title"} hit={item} tagName="mark"/>
                                    ) : item.title
                                }
                            </div>
                            <div className="hits__summary">
                                <p>
                                    { limitCharacter(item.article, 200) }
                                </p>
                            </div>
                        </div>
                    </li>
                ))
            }
        </StyledComponent>
    );
}
    
const StyledComponent = Styled.ul`
    width:100%;
    margin:0;

    li{
        display:flex;
        flex-direction:column;
        margin-bottom:1.5rem;

        .hits__image{
            width:100%;
            min-width:160px;
            height:170px;
            background:#eee;
            margin-bottom:1rem;
            overflow:hidden;
            border-radius:4px;

            img{
                width:100%;
                height:100%;
                object-fit:cover;
            }
        }

        .hits__title{
            font-size:1.2rem;
            font-weight:bold;
            color:var(--color);
            cursor:pointer;

            &:hover{
                color:#735dde;
            }
        }
        .hits__summary{
            p{
                font-size:.9rem;
                line-height:1.4rem;
            }
        }

    }

    @media(min-width:768px){
        width:60%;
    }
`
    
export default InfiniteHits