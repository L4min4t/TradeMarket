import {Container} from "./styles";
import {Category} from "../../api/constants/enums";
import React, {useEffect, useState} from "react";
import {getLikedPosters, getPosters, PosterPreviewDto} from "../../api/posters";
import {shuffleArray} from "../../utils/shufler";
import useAuthContext from "../../context/hooks";
import {useNavigate} from "react-router-dom";
import PosterPreview from "../PosterPreview";

interface SuggestedPostersProps {
    number: number;
    category: Category;
    excludePosterId: string;
}

const SuggestedPosters = ({number, category, excludePosterId}: SuggestedPostersProps) => {
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
            if (result && category && number && excludePosterId) {
                setPosters(
                    shuffleArray(
                        result.filter(poster => poster.category === category && poster.id !== excludePosterId)
                    ).slice(0, number)
                );
            }
        }

        getResponse();
    }, [category, number, excludePosterId, user, jwtTokens]);

    if (posters)
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
    else return (<></>);
}

export default SuggestedPosters;