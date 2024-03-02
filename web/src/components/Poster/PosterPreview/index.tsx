import useAuthContext from "../../../context/hooks";
import React, {useEffect, useState} from "react";

import {likePoster, PosterPreviewDto} from "../../../api/posters";
import CustomIcon from "../../CustomIcon";
import {getFormattedDate} from "../../../utils/date";
import {useNavigate} from "react-router-dom";
import {
    Like,
    PosterPreviewHead,
    PreviewContainer,
    PreviewImage,
    PreviewInfoContainer,
    PreviewPosterInfo,
    PreviewPosterTitle,
    Price,
    RowContainer,
    RowElement,
    Text
} from "./styles";

interface PosterPreviewProps {
    poster: PosterPreviewDto;
}

const PosterPreview = ({poster}: PosterPreviewProps) => {
    const navigate = useNavigate();
    const {jwtTokens} = useAuthContext();
    const [liked, setLiked] = useState<boolean>(poster.isLiked);
    useEffect(() => {
        if (!liked) poster.numberLiked += 1;
        if (liked) poster.numberLiked -= 1;
    }, [liked]);

    const imgUrl = `${process.env.REACT_APP_BASE_URL}/Images/${(poster.imageId || "basket")}.jpg`;

    return (
        <PreviewContainer key={`poster-${poster.id}`}>
            <PreviewImage onClick={() => navigate(`/posters/${poster.id}`)} src={imgUrl}/>
            <PreviewInfoContainer>

                <PosterPreviewHead>
                    <Like onClick={() => {
                        setLiked(!liked);
                        likePoster(poster.id, jwtTokens!.accessToken);
                    }}>
                        <CustomIcon src={liked ? "liked.png" : "like.png"} width="30px"/>
                    </Like>
                    <PreviewPosterTitle
                        onClick={() => navigate(`/posters/${poster.id}`)}>{poster.title}</PreviewPosterTitle>
                </PosterPreviewHead>
                <Price onClick={() => navigate(`/posters/${poster.id}`)}>
                    <CustomIcon src={"uah.png"} width={"20px"}/> {poster.price.toString()}
                </Price>
                {
                    poster.creator.city ? (
                        <PreviewPosterInfo onClick={() => navigate(`/posters/${poster.id}`)}>
                            <CustomIcon src="spot.png" width="18px"/>
                            {poster.creator.city.name}, {poster.creator.city.region}
                        </PreviewPosterInfo>
                    ) : (
                        <PreviewPosterInfo>
                            <CustomIcon src="spot.png" width="18px"/> Unknown city
                        </PreviewPosterInfo>
                    )
                }
                <PreviewPosterInfo onClick={() => navigate(`/posters/${poster.id}`)}>
                    {getFormattedDate(poster.publishedAt)}
                </PreviewPosterInfo>

                <RowContainer onClick={() => navigate(`/posters/${poster.id}`)}>
                    <RowElement>
                        <CustomIcon src="eye.png" height="18px"/>
                        <Text>{poster.numberViewed}</Text>
                    </RowElement>
                    <RowElement>
                        <CustomIcon src="big-finger.png" height="16px"/>
                        <Text>{poster.numberLiked}</Text>
                    </RowElement>

                </RowContainer>

            </PreviewInfoContainer>
        </PreviewContainer>
    );
};

export default PosterPreview;