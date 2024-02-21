import {Container} from "./styles";
import {Category} from "../../api/constants/enums";
import React, {useEffect, useState} from "react";
import {getLikedPosters, getPublishedPosters, PosterPreviewDto} from "../../api/posters";
import {shuffleArray} from "../../utils/shufler";
import useAuthContext from "../../context/hooks";
import PosterPreview from "../PosterPreview";

interface SuggestedPostersProps {
    number: number;
    category: Category;
    excludePosterId: string;
}

const SuggestedPosters = ({number, category, excludePosterId}: SuggestedPostersProps) => {
    const {user, jwtTokens} = useAuthContext();
    const [posters, setPosters] = useState<PosterPreviewDto[]>([]);

    useEffect(() => {
        async function getResponse() {
            const likeResult = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);
            const result = await getPublishedPosters(jwtTokens!.accessToken);
            if (result) {
                const updatedPosters = result.map((poster) => {
                    if (likeResult && likeResult.includes(poster.id)) {
                        return {...poster, isLiked: true};
                    }
                    return {...poster, isLiked: false};
                });
                setPosters(
                    shuffleArray(
                        updatedPosters.filter(poster => poster.category === category && poster.id !== excludePosterId)
                    ).slice(0, number)
                );
            }
        }

        getResponse();
    }, [category, number, excludePosterId, user, jwtTokens]);

    return posters
        ? <Container>
            {posters.map((poster) => (
                <PosterPreview key={poster.id} poster={poster}/>
            ))}
        </Container>
        : <></>;
};

export default SuggestedPosters;