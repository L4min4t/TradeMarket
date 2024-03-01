import React, {useEffect, useState} from "react";
import useAuthContext from "../../../context/hooks";
import {getPostersToModerate, PosterDto} from "../../../api/posters";
import {Container} from "./styles";
import ModeratePosterPreview from "../ModeratePosterPreview";


const PostersToModerateList = () => {
    const [posters, setPosters] = useState<PosterDto[] | null>(null);
    const {jwtTokens} = useAuthContext();

    useEffect(() => {
        async function getResponse() {
            const result = await getPostersToModerate(jwtTokens!.accessToken);
            if (result) setPosters(result);
        }

        getResponse();
    }, [jwtTokens]);


    return posters !== null
        ? <Container>
            {posters.map((poster) => (
                <ModeratePosterPreview poster={{...poster, isLiked: false}}/>
            ))}
        </Container>
        : <></>;
};

export default PostersToModerateList;