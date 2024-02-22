import React from "react";

import {PosterPreviewDto} from "../../../api/posters";
import CustomIcon from "../../CustomIcon";
import {getFormattedDate} from "../../../utils/date";
import {useNavigate} from "react-router-dom";
import {
    PosterPreviewHead,
    PreviewContainer,
    PreviewImage,
    PreviewInfoContainer,
    PreviewPosterInfo,
    PreviewPosterTitle,
    Price
} from "./styles";

interface PosterPreviewProps {
    poster: PosterPreviewDto;
}

const ModeratePosterPreview = ({poster}: PosterPreviewProps) => {
    const navigate = useNavigate();

    const imgUrl = `${process.env.REACT_APP_BASE_URL}/Images/${(poster.imageId || "basket")}.jpg`;

    return (
        <PreviewContainer key={`poster-${poster.id}`} onClick={() => navigate(`/moderate-poster/${poster.id}`)}>
            <PreviewImage src={imgUrl}/>
            <PreviewInfoContainer>
                <PosterPreviewHead>
                    <PreviewPosterTitle>{poster.title}</PreviewPosterTitle>
                </PosterPreviewHead>
                <Price><CustomIcon src={"uah.png"} width={"20px"}/> {poster.price.toString()}</Price>
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
                <PreviewPosterInfo>
                    {getFormattedDate(poster.publishedAt)}
                </PreviewPosterInfo>
            </PreviewInfoContainer>
        </PreviewContainer>
    );
};

export default ModeratePosterPreview;