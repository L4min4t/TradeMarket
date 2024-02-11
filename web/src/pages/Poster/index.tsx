﻿import useAuthContext from "../../context/hooks";
import {useEffect, useState} from "react";
import {getPoster, PosterDto} from "../../api/posters";
import PosterDetail from "../../components/PosterDetail";
import {useNavigate, useParams} from "react-router-dom";

const PosterPage = () => {
    const {jwtTokens} = useAuthContext();
    const [poster, setPoster] = useState<PosterDto | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getResponse() {
            if (typeof id === 'string') {
                const result = await getPoster(jwtTokens!.accessToken, id);

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
        return (
            <PosterDetail poster={poster}/>
        );
    } else return (<></>);
}

export default PosterPage;