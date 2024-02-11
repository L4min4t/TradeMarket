import {PosterDto} from "../../api/posters";
import {
    Container,
    Description,
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
    Title
} from "./styles";
import {getFormattedDate} from "../../utils/date";
import CustomIcon from "../CustomIcon";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Category} from "../../api/constants/enums";
import PostersPreviewList from "../PostersPreviewList";

interface PosterDetailProps {
    poster: PosterDto;
}

const PosterDetail = (props: PosterDetailProps) => {
    const navigate = useNavigate();

    const imageUrl = process.env.REACT_APP_BASE_URL + "/Images/" + (props.poster.imageId || "basket") + ".jpg";

    return (
        <Container>
            <PosterContainer>
                <Title>{props.poster.title}</Title>
                <MainInfoContainer>
                    <PosterDetailImage src={imageUrl}/>
                    <PosterMainInfo>
                        <PublishTime>{getFormattedDate(props.poster.publishedAt)}</PublishTime>

                        <PriceContainer>
                            <Price><CustomIcon src="uah.png" width="22px"/> {props.poster.price}</Price>
                            {props.poster.isSharing && <Sharing>trade-off</Sharing>}
                        </PriceContainer>

                        <Link onClick={() => navigate('/user-posters')}>{props.poster.creator.name}</Link>

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
                        <CustomIcon src="category.png" width="26px"/><TagLink
                        onClick={() => navigate('/')}>{Category[props.poster.category]}</TagLink>
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

                <Description> desc {props.poster.description}</Description>


            </PosterContainer>
            <SuggestedPostersContainer>
                <PostersPreviewList category={props.poster.category} number={3} id={props.poster.id}/>
            </SuggestedPostersContainer>
        </Container>
    );
}


export default PosterDetail;