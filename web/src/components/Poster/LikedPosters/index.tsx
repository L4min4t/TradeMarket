import useAuthContext from "../../../context/hooks";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getLikedPosters, PosterDto} from "../../../api/posters";
import PosterPreview from "../PosterPreview";
import {Container, Titile} from "./styles";

const LikedPosters = () => {
    const {user, jwtTokens} = useAuthContext();
    const navigate = useNavigate();
    const [posters, setPosters] = useState<PosterDto[]>([]);

    useEffect(() => {
        async function getResponse() {
            const result = await getLikedPosters(jwtTokens!.accessToken, user!.id);
            if (result) {
                const updatedPosters = result.map((poster) => ({...poster, isLiked: true}));
                setPosters(updatedPosters);
            }
        }

        getResponse();
    }, [jwtTokens, navigate, user]);

    return posters.length ?
        <Container>
            {posters.map((poster) => (
                <PosterPreview key={poster.id} poster={poster}/>
            ))}
        </Container>
        : <Titile>There are no liked posters yet!</Titile>;
};

export default LikedPosters;