import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {getPosters, PosterPreviewDto} from "../../api/posters";
import useAuthContext from "../../context/hooks";

import {
    Container,
    PreviewContainer,
    PreviewImage,
    PreviewInfoContainer,
    PreviewPosterInfo,
    PreviewPosterTitle,
    Price
} from "./styles";
import CustomIcon from "../CustomIcon";
import {getFormattedDate} from "../../utils/date";

const PostersPreviewList = () => {
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
        <Container>
            {posters &&
                posters.map(poster => {
                    const imgUrl = `${process.env.REACT_APP_BASE_URL}/Images/${(poster.imageId || "basket")}.jpg`;
                    return (
                        <PreviewContainer onClick={() => navigate(`/posters/${poster.id}`)} key={`poster-${poster.id}`}>
                            <PreviewImage src={imgUrl}/>
                            <PreviewInfoContainer>

                                <PreviewPosterTitle>{poster.title}</PreviewPosterTitle>
                                <Price>
                                    <CustomIcon src={"uah.png"} width={"20px"}/> {poster.price.toString()}
                                </Price>
                                {
                                    poster.creator.city ? (
                                        <PreviewPosterInfo>
                                            <CustomIcon src="spot.png" width="18px"/>
                                            {poster.creator.city.name}, {poster.creator.city.region}
                                        </PreviewPosterInfo>
                                    ) : (
                                        <PreviewPosterInfo>
                                            <CustomIcon src="spot.png" width="18px"/> Unknown city
                                        </PreviewPosterInfo>
                                    )
                                }
                                <PreviewPosterInfo>{getFormattedDate(poster.publishedAt)}</PreviewPosterInfo>

                            </PreviewInfoContainer>
                        </PreviewContainer>
                    );
                })}
        </Container>
    );
};

export default PostersPreviewList;