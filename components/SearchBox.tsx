import Styled from '@emotion/styled'
import { PoweredBy } from 'react-instantsearch-dom'
    
const SearchBox = ({ currentRefinement, refine, setQuery }) => {
    return (
        <StyledComponent>
            <div className="searchbox">
                <input
                    type="text"
                    placeholder="Search here..."
                    value={currentRefinement}
                    onChange={event => {refine(event.currentTarget.value); setQuery(event.currentTarget.value)}}/>
                <PoweredBy
                    translations={{
                        searchBy: '',
                    }}
                />
            </div>
        </StyledComponent>
    );
}
    
const StyledComponent = Styled.div`
    .searchbox{
        position: relative;
        display: flex;
        align-items: center;

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
            position: absolute;
            right: 1rem;
            transform:translateY(-1px);
        }
        .ais-PoweredBy-text{
            display:none;
        }
        a{
            svg{
                width: 4rem;

                path:last-of-type{
                    fill:var(--algolia-text);
                }
            }
        }
    }
`
    
export default SearchBox