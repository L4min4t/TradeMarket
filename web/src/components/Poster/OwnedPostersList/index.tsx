import React, {useEffect, useState} from "react";

import {getUserPosters, PosterDto} from "../../../api/posters";
import useAuthContext from "../../../context/hooks";
import {Container, CreatePoster} from "./styles";
import EditPosterPreview from "../EditPosterPreview";
import {useNavigate} from "react-router-dom";
import CustomIcon from "../../CustomIcon";


const OwnedPostersPreviewList = () => {
    const navigate = useNavigate();
    const {jwtTokens} = useAuthContext();
    const [posters, setPosters] = useState<PosterDto[] | null>(null);

    useEffect(() => {
        async function getResponse() {
            const result = await getUserPosters(jwtTokens!.accessToken);
            if (result) setPosters(result);
        }

        getResponse();
    }, [jwtTokens]);

    const removePoster = (id: string) => {
        if (posters) {
            const updatedPosters = posters.filter((poster) => poster.id !== id);
            setPosters(updatedPosters);
        }
    };


    return posters
        ? <Container>
            <CreatePoster onClick={() => navigate("/create")}>
                <CustomIcon src="add.png" width="35%"/>
            </CreatePoster>
            {posters.map((poster) => (
                <EditPosterPreview key={poster.id} poster={poster} removePoster={removePoster}/>
            ))}
        </Container>
        : <></>;
};

export default OwnedPostersPreviewList;