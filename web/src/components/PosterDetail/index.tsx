import {likePoster, PosterDto} from "../../api/posters";
import {
    Container,
    Description,
    Like,
    Link,
    MainInfoContainer,
    PosterContainer,
    PosterDetailImage,
    PosterMainInfo,
    PosterTagsContainer,
    Price,
    PriceContainer,
    PublishTime,
    Sharing,
    SuggestedPostersContainer,
    Tag,
    TagLink,
    Title,
    TitleContainer
} from "./styles";
import {getFormattedDate} from "../../utils/date";
import CustomIcon from "../CustomIcon";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Category} from "../../api/constants/enums";
import useAuthContext from "../../context/hooks";
import SuggestedPosters from "../SuggestedPosters";

interface PosterDetailProps {
    poster: PosterDto;
    isLiked: boolean;
}

const PosterDetail = (props: PosterDetailProps) => {
    const {jwtTokens} = useAuthContext();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(props.isLiked);

    const imageUrl = process.env.REACT_APP_BASE_URL + "/Images/" + (props.poster.imageId || "basket") + ".jpg";

    return (
        <Container>
            <PosterContainer>
                <TitleContainer>
                    <Like onClick={() => {
                        setLiked(!liked);
                        likePoster(props.poster.id, jwtTokens!.accessToken);
                    }}>
                        <CustomIcon src={liked ? "liked.png" : "like.png"} width="40px"/>
                    </Like>
                    <Title>{props.poster.title}</Title>
                </TitleContainer>

                <MainInfoContainer>
                    <PosterDetailImage src={imageUrl}/>
                    <PosterMainInfo>
                        <PublishTime>{getFormattedDate(props.poster.publishedAt)}</PublishTime>

                        <PriceContainer>
                            <Price><CustomIcon src="uah.png" width="22px"/> {props.poster.price}</Price>
                            {props.poster.isSharing && <Sharing>trade-off</Sharing>}
                        </PriceContainer>

                        <Link
                            onClick={() => navigate(`/user-posters/${props.poster.creatorId}`)}>{props.poster.creator.name}</Link>

                        {
                            props.poster.creator.city &&
                            <Link
                                href={`https://www.google.com/maps/search/?api=1&query=${props.poster.creator.city.name}${props.poster.creator.city.region}`}>
                                <CustomIcon src="spot.png" width="18px"
                                /> {props.poster.creator.city.name}, {props.poster.creator.city.region}
                            </Link>
                        }
                        {
                            props.poster.creator.email &&
                            <Link href={`mailto: ${props.poster.creator.email}`}>
                                <CustomIcon src="email.png" width="18px"/> {props.poster.creator.email}
                            </Link>
                        }
                        {
                            props.poster.creator.phone &&
                            <Link href={`tel:${props.poster.creator.phone}`}>
                                <CustomIcon src="phone.png" width="18px"/> {props.poster.creator.phone}
                            </Link>
                        }

                        {
                            props.poster.creator.telegram &&
                            <Link href={`https://t.me/${props.poster.creator.telegram}`}>
                                <CustomIcon src="telegram.png" width="18px"/> {props.poster.creator.telegram}
                            </Link>
                        }
                    </PosterMainInfo>
                </MainInfoContainer>
                <PosterTagsContainer>
                    <Tag>
                        <CustomIcon src="category.png" width="26px"/>
                        <TagLink onClick={() => navigate('/')}>{Category[props.poster.category]}</TagLink>
                    </Tag>
                    <Tag>
                        <CustomIcon src="secondHand.png" width="26px"/> {props.poster.isNew ? "New" : "Used"}
                    </Tag>
                    <Tag>
                        <CustomIcon src="like.png" width="26px"/> {props.poster.numberLiked}
                    </Tag>
                    <Tag>
                        <CustomIcon src="eye.png" width="26px"/> {props.poster.numberViewed}
                    </Tag>
                </PosterTagsContainer>

                <Description>
                    {props.poster.description.split("\n").map((line, index, array) => (
                        <p key={index}>
                            {line}
                            {index < array.length - 1 && <br/>}
                        </p>
                    ))}
                </Description>


            </PosterContainer>
            <SuggestedPostersContainer>
                <SuggestedPosters category={props.poster.category} number={3} excludePosterId={props.poster.id}/>
            </SuggestedPostersContainer>
        </Container>
    );
}


export default PosterDetail;