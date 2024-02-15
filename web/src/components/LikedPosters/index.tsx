import useAuthContext from "../../context/hooks";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getLikedPosters, getPosters, PosterPreviewDto} from "../../api/posters";
import PosterPreview from "../PosterPreview";
import {Container} from "./styles";

const LikedPosters = () => {
    const {user, jwtTokens} = useAuthContext();
    const navigate = useNavigate();
    const [posters, setPosters] = useState<PosterPreviewDto[]>([]);
    const [likedPosterIds, setLikedPosterIds] = useState<string[]>([]);

    useEffect(() => {
        async function getResponse() {
            if (!jwtTokens || !user) navigate("/login");

            const result = await getPosters(jwtTokens!.accessToken);
            const likeResult = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);
            if (likeResult) setLikedPosterIds(likeResult);
            if (result && likedPosterIds.length) setPosters(result.filter(poster => likedPosterIds.includes(poster.id)));
        }

        getResponse();
    }, [jwtTokens, navigate, user, likedPosterIds]);

    if (posters) {
        console.log(likedPosterIds);
        console.log(posters);
        return (
            <Container>
                {posters.map((poster) => (
                    <PosterPreview
                        key={poster.id}
                        poster={poster}
                        isLiked={likedPosterIds.includes(poster.id)}
                    />
                ))}
            </Container>
        );
    } else return (<></>);
};

export default LikedPosters;