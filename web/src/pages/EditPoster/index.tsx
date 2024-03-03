import EditPoster from "../../components/Poster/EditPoster";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPoster, PosterDto} from "../../api/posters";
import {toast} from "react-toastify";
import useAuthContext from "../../context/hooks";


const EditPosterPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {user, jwtTokens} = useAuthContext();
    const [poster, setPoster] = useState<PosterDto>();

    useEffect(() => {
        async function getResponse() {
            if (typeof id === 'string') {
                const result = await getPoster(jwtTokens!.accessToken, id);
                if (result) setPoster(result as PosterDto);
            } else {
                toast.error("Failed loading poster information!");
                navigate("/user#myPosters");
            }
        }

        getResponse();
    }, [id, jwtTokens, user]);
    return id && poster ? <EditPoster poster={poster}/> : <></>;
}

export default EditPosterPage;