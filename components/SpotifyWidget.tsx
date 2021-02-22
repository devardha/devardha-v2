import Styled from '@emotion/styled'
import useSWR from 'swr'
import { FaSpotify } from 'react-icons/fa'
    
const SpotifyWidget = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data } = useSWR('/api/spotify', fetcher)

    return (
        <StyledComponent>
            <div className="spotify__card">
                <div className="song__image">
                    { data ? <img src={data.albumImageUrl} alt="Spotify album"/> : '' }
                </div>
                <div className="song__details">
                    <div className="song__title">{ data ? data.album : 'Not Listening' }</div>
                    <div className="song__artist">{ data ? data.artist : 'Spotify' }</div>
                </div>
                <span className="icon"><FaSpotify/></span>
            </div>
        </StyledComponent>
    );
}
    
const StyledComponent = Styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:2rem;

    .icon{
        position:absolute;
        right:1.25rem;
        color:#1DB954;
        bottom:1rem;
        font-size:1.1rem;
    }

    .spotify__card{
        display:flex;
        position:relative;
        align-items:center;
        background:#fff;
        box-shadow:0 2px 30px rgb(0,0,0,0.05);
        padding:1rem 1.25rem;
        min-width:290px;
        border-radius:8px;
    }

    .song__image{
        width:64px;
        height:64px;
        background:#eee;
        overflow:hidden;
        border-radius:4px;
        margin-right:1rem;

        img{
            width:100%;
            height:100%;
            object-fit:cover;
        }
    }

    .song__details{
        display:flex;
        align-items:flex-start;
        flex-direction:column;

        .song__title{
            font-size:1rem;
            margin-bottom:.3rem;
            font-weight:600;
            color:#111;
        }

        .song__artist{
            font-size:.9rem;
            color:#999;
        }
    }
`
    
export default SpotifyWidget