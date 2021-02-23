import Styled from '@emotion/styled'
import { useState } from 'react';
    
const Project = ({ item }) => {
    const [onHover, setOnHover] = useState(false)
    return (
        <StyledComponent>
            <div className="project__image" onMouseOver={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
                <a href={item.site_link} target="_blank" rel="noopener noreferrer"><div className={ onHover ? 'open' : '' }>{item.site_link}</div></a>
                <img src={item.sitem_image} alt="Project"/>
            </div>
            <div className="project__name">{ item.project_name }</div>
            <div className="project__summary">
                <p>{item.project_summary}</p>
            </div>
        </StyledComponent>
    );
}
    
const StyledComponent = Styled.li`
    .project__image{
        div{
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgb(0,0,0,0.6);
            color: white;
            font-size: 1.1rem;
            opacity:0;
            cursor:pointer;
        }

        .open{
            opacity:1;
        }
    }
`
    
export default Project