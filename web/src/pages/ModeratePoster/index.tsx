import React, {useEffect, useState} from "react";
import {getPoster, PosterDto, viewPoster} from "../../api/posters";
import useAuthContext from "../../context/hooks";
import {useNavigate, useParams} from "react-router-dom";
import ModeratePosterDetail from "../../components/Poster/ModeratePosterDetail";
import {toast} from "react-toastify";


const ModeratePosterPage = () => {
    const {user, jwtTokens} = useAuthContext();
    const [poster, setPoster] = useState<PosterDto | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getResponse() {
            if (typeof id === 'string') {
                await viewPoster(jwtTokens!.accessToken, id!);
                const result = await getPoster(jwtTokens!.accessToken, id);
                if (result) setPoster(result as PosterDto);
            } else {
                toast.error("Failed loading poster information!");
                navigate("/user#moderatePosters");
            }

        }

        getResponse();
    }, [id, jwtTokens, user]);

    return poster ? <ModeratePosterDetail poster={poster}/> : <></>;
};

export default ModeratePosterPage;