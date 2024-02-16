import {getLikedPosters, likePoster, PosterDto} from "../../api/posters";
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
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Category} from "../../api/constants/enums";
import useAuthContext from "../../context/hooks";
import SuggestedPosters from "../SuggestedPosters";

interface PosterDetailProps {
    poster: PosterDto;
}

const PosterDetail = ({poster}: PosterDetailProps) => {
    const {user, jwtTokens} = useAuthContext();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
            async function getResponse() {
                if (!jwtTokens || !user) navigate("/login");

                const result = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);
                setLiked(result ? result.includes(poster.id) : false);
            }

            getResponse();
        }, [jwtTokens, user, poster]
    );


    const imageUrl = process.env.REACT_APP_BASE_URL + "/Images/" + (poster.imageId || "basket") + ".jpg";

    return (
        <Container>
            <PosterContainer>
                <TitleContainer>
                    <Like onClick={() => {
                        setLiked(!liked);
                        likePoster(poster.id, jwtTokens!.accessToken);
                    }}>
                        <CustomIcon src={liked ? "liked.png" : "like.png"} width="40px"/>
                    </Like>
                    <Title>{poster.title}</Title>
                </TitleContainer>

                <MainInfoContainer>
                    <PosterDetailImage src={imageUrl}/>
                    <PosterMainInfo>
                        <PublishTime>{getFormattedDate(poster.publishedAt)}</PublishTime>

                        <PriceContainer>
                            <Price><CustomIcon src="uah.png" width="22px"/> {poster.price}</Price>
                            {poster.isSharing && <Sharing>trade-off</Sharing>}
                        </PriceContainer>

                        <Link
                            onClick={() => navigate(`/user-posters/${poster.creatorId}`)}>{poster.creator.name}</Link>

                        {
                            poster.creator.city &&
                            <Link
                                href={`https://www.google.com/maps/search/?api=1&query=${poster.creator.city.name}${poster.creator.city.region}`}>
                                <CustomIcon src="spot.png" width="18px"
                                /> {poster.creator.city.name}, {poster.creator.city.region}
                            </Link>
                        }
                        {
                            poster.creator.email &&
                            <Link href={`mailto: ${poster.creator.email}`}>
                                <CustomIcon src="email.png" width="18px"/> {poster.creator.email}
                            </Link>
                        }
                        {
                            poster.creator.phone &&
                            <Link href={`tel:${poster.creator.phone}`}>
                                <CustomIcon src="phone.png" width="18px"/> {poster.creator.phone}
                            </Link>
                        }

                        {
                            poster.creator.telegram &&
                            <Link href={`https://t.me/${poster.creator.telegram}`}>
                                <CustomIcon src="telegram.png" width="18px"/> {poster.creator.telegram}
                            </Link>
                        }
                    </PosterMainInfo>
                </MainInfoContainer>
                <PosterTagsContainer>
                    <Tag>
                        <CustomIcon src="category.png" width="26px"/>
                        <TagLink onClick={() => navigate('/')}>{Category[poster.category]}</TagLink>
                    </Tag>
                    <Tag>
                        <CustomIcon src="secondHand.png" width="26px"/> {poster.isNew ? "New" : "Used"}
                    </Tag>
                    <Tag>
                        <CustomIcon src="like.png" width="26px"/> {poster.numberLiked}
                    </Tag>
                    <Tag>
                        <CustomIcon src="eye.png" width="26px"/> {poster.numberViewed}
                    </Tag>
                </PosterTagsContainer>

                <Description>
                    {poster.description.split("\n").map((line, index, array) => (
                        <p key={index}>
                            {line}
                            {index < array.length - 1 && <br/>}
                        </p>
                    ))}
                </Description>


            </PosterContainer>
            <SuggestedPostersContainer>
                <SuggestedPosters category={poster.category} number={3} excludePosterId={poster.id}/>
            </SuggestedPostersContainer>
        </Container>
    );
}


export default PosterDetail;