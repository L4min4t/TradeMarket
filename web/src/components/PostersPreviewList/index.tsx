import React, {useEffect, useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

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
import {Category} from "../../api/constants/enums";
import {shuffleArray} from "../../utils/shufler";

interface GetPosterProps {
    poster: PosterPreviewDto;
    navigate: NavigateFunction;
}

const PosterPreview = ({poster, navigate}: GetPosterProps) => {
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
};

interface PostersPreviewListProps {
    number?: number;
    category?: Category;
    id?: string;
}

const PostersPreviewList = ({number, category, id}: PostersPreviewListProps) => {
    const {jwtTokens} = useAuthContext();
    const navigate = useNavigate();
    const [posters, setPosters] = useState<PosterPreviewDto[]>([]);
    const [displayedPosters, setDisplayedPosters] = useState<PosterPreviewDto[]>([]);

    useEffect(() => {
        async function getResponse() {
            if (jwtTokens) {
                const result = await getPosters(jwtTokens.accessToken);
                if (result) {
                    setPosters(result);
                    const filteredPosters = category
                        ? shuffleArray(result.filter(poster => poster.category === category && poster.id !== id))
                        : result;
                    setDisplayedPosters(number ? filteredPosters.slice(0, number) : filteredPosters);
                }
            } else {
                navigate("/login");
            }
        }

        getResponse();
    }, [jwtTokens, navigate, category, number]);

    return (
        <Container>
            {displayedPosters.map((poster) => (
                <PosterPreview key={poster.id} poster={poster} navigate={navigate}/>
            ))}
        </Container>
    );
};

export default PostersPreviewList;
