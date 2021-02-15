import Styled from '@emotion/styled'
import { FaTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa'
    
const SocialShare = ({ url, title }) => {
    return (
        <StyledComponent>
            <ul>
                <li className="twitter"><a href={`https://twitter.com/intent/tweet?url=${url}&text=${title} by Ardha Yudhatama`} target="_blank"><span><FaTwitter/></span></a></li>
                <li className="linkedin"><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=&source=`} target="_blank"><span><FaLinkedinIn/></span></a></li>
                <li className="facebook"><a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank"><span><FaFacebookF/></span></a></li>
            </ul>
        </StyledComponent>
    );
}
    
const StyledComponent = Styled.div`
    position: absolute;
    top: 0;
    width: 48px;
    transform: translateX(-66px);

    ul{
        display:flex;
        flex-direction:column;
        margin:0;

        li{
            display:flex;
            align-items:center;
            justify-content:center;
            width:48px;
            height:48px;
            margin-bottom:1rem;
            border-radius:8px;
            color:white !important;
            font-size:1.25rem;
            cursor:pointer;

            a{
                color:inherit;
            }

            &:hover{
                transform:translateY(-2px);
            }
        }
        
        .twitter{
            background:#1DA1F2;
        }
        .facebook{
            background:#4267B2;
        }
        .linkedin{
            background:#2867B2;
        }
    }
`
    
export default SocialShare