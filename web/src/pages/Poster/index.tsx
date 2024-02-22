import useAuthContext from "../../context/hooks";
import {useEffect, useState} from "react";
import {getLikedPosters, getPoster, PosterDto, viewPoster} from "../../api/posters";
import PosterDetail from "../../components/Poster/PosterDetail";
import {useParams} from "react-router-dom";

const PosterPage = () => {
    const {user, jwtTokens} = useAuthContext();
    const [poster, setPoster] = useState<PosterDto | null>(null);
    const {id} = useParams();
    const [likedPosterIds, setLikedPosterIds] = useState<string[]>([]);

    useEffect(() => {
        async function getResponse() {
            if (typeof id === 'string') {
                await viewPoster(jwtTokens!.accessToken, id!);
                const result = await getPoster(jwtTokens!.accessToken, id);

                const likeResult = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);

                if (likeResult) setLikedPosterIds(likeResult);

                if (result) setPoster(result as PosterDto);
            } else setPoster(null);
        }

        getResponse();
    }, [id, jwtTokens, user]);

    return poster && likedPosterIds ? <PosterDetail poster={poster}/> : <></>;
}

export default PosterPage;