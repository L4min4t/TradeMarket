import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {getLikedPosters, getPosters, PosterPreviewDto} from "../../api/posters";
import useAuthContext from "../../context/hooks";

import {Container} from "./styles";
import PosterPreview from "../PosterPreview";

interface PostersPreviewListProps {
    creatorId?: string;
    showLiked?: boolean;
}

const PostersPreviewList = ({creatorId, showLiked}: PostersPreviewListProps) => {
    const {user, jwtTokens} = useAuthContext();
    const navigate = useNavigate();
    const [posters, setPosters] = useState<PosterPreviewDto[]>([]);
    const [displayedPosters, setDisplayedPosters] = useState<PosterPreviewDto[]>([]);
    const [likedPosterIds, setLikedPosterIds] = useState<string[]>([]);

    useEffect(() => {
            async function getResponse() {
                if (jwtTokens && user) {
                    const likeResult = (await getLikedPosters(jwtTokens.accessToken, user.id))?.map((poster) => poster.id);
                    if (likeResult) setLikedPosterIds(likeResult);
                    const result = await getPosters(jwtTokens.accessToken);
                    if (result) {
                        setPosters(result);
                        let filteredPosters: PosterPreviewDto[];
                        if (creatorId) {
                            filteredPosters = result.filter(poster => poster.creatorId === creatorId);
                        } else if (showLiked) {
                            filteredPosters = result.filter(poster => likedPosterIds.includes(poster.id));
                        } else {
                            filteredPosters = result;
                        }
                        setDisplayedPosters(filteredPosters);
                    }
                } else {
                    navigate("/login");
                }
            }

            getResponse();
        }, [jwtTokens, navigate, creatorId, user, showLiked]
    );

    return (
        <Container>
            {displayedPosters.map((poster) => (
                <PosterPreview key={poster.id} poster={poster} isLiked={likedPosterIds.includes(poster.id)}/>
            ))}
        </Container>
    );
};

export default PostersPreviewList;
