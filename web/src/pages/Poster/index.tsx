import useAuthContext from "../../context/hooks";
import {useEffect, useState} from "react";
import {getLikedPosters, getPoster, PosterDto, viewPoster} from "../../api/posters";
import PosterDetail from "../../components/PosterDetail";
import {useNavigate, useParams} from "react-router-dom";

const PosterPage = () => {
    const {user, jwtTokens} = useAuthContext();
    const [poster, setPoster] = useState<PosterDto | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const [likedPosterIds, setLikedPosterIds] = useState<string[]>([]);

    useEffect(() => {
        async function getResponse() {
            if (typeof id === 'string') {
                const result = await getPoster(jwtTokens!.accessToken, id);
                await viewPoster(jwtTokens!.accessToken, id!);
                const likeResult = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);
                if (likeResult) {
                    setLikedPosterIds(likeResult);
                }
                if (result) {
                    setPoster(result as PosterDto);
                }
            } else setPoster(null);
        }

        if (jwtTokens) {
            getResponse();
        } else {
            navigate("/login");
        }
    }, [id, jwtTokens]);


    if (poster !== null) {
        poster.numberViewed += 1;
        return (
            <PosterDetail poster={poster} isLiked={likedPosterIds.includes(poster.id)}/>
        );
    } else return (<></>);
}

export default PosterPage;