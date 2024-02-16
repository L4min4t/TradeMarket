import React, {useEffect, useState} from "react";
import PostersPreviewList from "../../components/PostersPreviewList";
import useAuthContext from "../../context/hooks";
import {getLikedPosters, getPosters, PosterPreviewDto} from "../../api/posters";
import {UserPostersContainer} from "./styles";

interface UserPostersProps {
    id: string;
}

const UserPosters = ({id}: UserPostersProps) => {
    const {user, jwtTokens} = useAuthContext();
    const [posters, setPosters] = useState<PosterPreviewDto[]>([]);
    const [likedPosterIds, setLikedPosterIds] = useState<string[]>([]);

    useEffect(() => {
        async function getResponse() {
            const result = await getPosters(jwtTokens!.accessToken);
            const likeResult = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);
            if (likeResult) setLikedPosterIds(likeResult);
            if (result && id) {
                const updatedPosters = result.map((poster) => {
                    if (likedPosterIds && likedPosterIds.includes(poster.id)) {
                        return {...poster, isLiked: true};
                    }
                    return {...poster, isLiked: false};
                });
                setPosters(updatedPosters.filter(poster => poster.creatorId === id));
            }
        }

        getResponse();
    }, [id, user, jwtTokens]);


    return (
        <UserPostersContainer>
            <PostersPreviewList posters={posters}/>
        </UserPostersContainer>
    );
};

export default UserPosters;