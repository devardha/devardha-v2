import Styled from '@emotion/styled'
import { PoweredBy } from 'react-instantsearch-dom'
    
const SearchBox = ({ currentRefinement, refine }) => {
    return (
        <StyledComponent>
            <div className="searchbox">
                <input
                    type="text"
                    placeholder="Search here..."
                    value={currentRefinement}
                    onChange={event => refine(event.currentTarget.value)}/>
                <PoweredBy
                    translations={{
                        searchBy: 'Powered by',
                    }}
                />
            </div>
        </StyledComponent>
    );
}
    
const StyledComponent = Styled.div`
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
`
    
export default SearchBox