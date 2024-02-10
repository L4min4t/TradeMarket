import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {PosterPreviewDto, getPosters} from "../../api/posters";
import useAuthContext from "../../context/hooks";

import {PosterPreviewContainer, PosterPreviewImage, PostersListContainer} from "./style";

const PostersList = () => {
    const {user, jwtTokens} = useAuthContext();
    const navigate = useNavigate();
    const [posters, setPosters] = useState<PosterPreviewDto[] | null>(null);

    useEffect(() => {
        async function getResponse() {
            const result = await getPosters(jwtTokens!.accessToken);

            if (result) {
                setPosters(result as PosterPreviewDto[]);
            }
        }

        getResponse();
    }, []);

    return (
        <PostersListContainer gap={"2%"}>
            {posters &&
                posters.map(poster => {
                    const imageUrl = process.env.REACT_APP_BASE_URL + "/Images/" + (poster.imageId || "basket") + ".jpg";
                    return (
                        <PosterPreviewContainer id={poster.id} flexDirection={"column"}
                                                onClick={() => navigate(`/posters/${poster.id}`)}
                                                key={`poster-${poster.id}`}
                        >
                            <PosterPreviewImage src={imageUrl}/>
                            <>
                                <h1>{poster.title}</h1>
                                <p>{poster.creator.city.name}, {poster.creator.city.region}</p>
                                <p>{poster.price.toString()} uah</p>
                            </>


                        </PosterPreviewContainer>
                    );
                })}
        </PostersListContainer>
    );
};



export default PostersList;