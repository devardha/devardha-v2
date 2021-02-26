import Styled from '@emotion/styled'
    
const RefinementList = ({ items, filters, setFilters }) => {
    const handleFilter = (tag, filters) => {
        if(filters.includes(tag)){
            const filter = filters.filter(item => item !== tag)
            setFilters(filter)
        }else{
            setFilters([...filters, tag])
        }
    }

    return (
        <StyledComponent>
            <h2>Tags</h2>
            {
                items?.map((item, index) => {
                    return(
                        <button
                        key={index}
                        onClick={() => handleFilter(item.label, filters)}
                        className={filters?.includes(item.label) ? 'active' : ''}
                    >
                    {item.label.toString()} ({item.count})
                    </button>
                    )
                })
            }
        </StyledComponent>
    );
}
    
const StyledComponent = Styled.div`
    h2{
        margin: 0;
        font-size: 1.25rem;
        margin-bottom: 1rem;
        font-weight: bold;
    }

    button{
        background: var(--label-bg);
        border: 1px solid var(--label-border);
        color:var(--label-text);
        padding: 8px 16px;
        border-radius: 4px;
        margin-right: 8px;
        font-size:.9rem;
        cursor:pointer;
        margin-bottom:8px;

        &:hover{
            border-color:#999;
        }

        &:focus{
            outline:0;
        }
    }

    button.active{
        border-color:#735dde;
        background:#735dde;
        color:#fff;
    }
`
    
export default RefinementList