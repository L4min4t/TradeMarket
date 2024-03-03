import useAuthContext from "../../context/hooks";
import {useEffect, useState} from "react";
import {getLikedPosters, getPoster, PosterDto, viewPoster} from "../../api/posters";
import PosterDetail from "../../components/Poster/PosterDetail";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const PosterPage = () => {
    const {user, jwtTokens} = useAuthContext();
    const [poster, setPoster] = useState<PosterDto | null>(null);
    const {id} = useParams();
    const [likedPosterIds, setLikedPosterIds] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getResponse() {
            if (typeof id === 'string') {
                const viewResult = await viewPoster(jwtTokens!.accessToken, id!);
                if (!viewResult) console.log("Failed view poster server functionality!");

                const result = await getPoster(jwtTokens!.accessToken, id);

                const likeResult = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);

                if (likeResult) setLikedPosterIds(likeResult);
                else toast.error("Failed loading like info!");

                if (result) setPoster(result as PosterDto);
                else toast.error("Failed poster loading!");
            } else {
                toast.error("Failed loading poster information!");
                navigate("/");
            }
        }

        getResponse();
    }, [id, jwtTokens, user]);

    return poster && likedPosterIds ? <PosterDetail poster={poster}/> : <></>;
}

export default PosterPage;