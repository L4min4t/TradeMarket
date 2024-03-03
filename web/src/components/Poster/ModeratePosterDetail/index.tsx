import {useNavigate} from "react-router-dom";
import {moderatePoster, PosterDto} from "../../../api/posters";
import React, {useState} from "react";
import {
    Container,
    Description,
    Link,
    MainInfoContainer,
    ManageButton,
    ManageButtonContainer,
    PosterContainer,
    PosterDetailImage,
    PosterMainInfo,
    PosterTagsContainer,
    Price,
    PriceContainer,
    PublishTime,
    Sharing,
    Tag,
    TagLink,
    Title,
    TitleContainer
} from "./styles";
import Modal from "../../Modal";
import GoogleMap from "../../GoogleMap";
import {getFormattedDate} from "../../../utils/date";
import CustomIcon from "../../CustomIcon";
import {Category} from "../../../api/constants/enums";
import useAuthContext from "../../../context/hooks";
import {toast} from "react-toastify";

interface PosterDetailProps {
    poster: PosterDto;
}

const ModeratePosterDetail = ({poster}: PosterDetailProps) => {
    const {jwtTokens} = useAuthContext();
    const navigate = useNavigate();
    const [isLocationRequested, setLocationRequest] = useState(false);

    const imageUrl = process.env.REACT_APP_BASE_URL + "/Images/" + (poster.imageId || "basket") + ".jpg";

    return (
        <Container>
            {isLocationRequested && (
                <Modal width="800px" height="700px" onClose={() => setLocationRequest(false)}>
                    <GoogleMap location={`${poster.creator.city.name},${poster.creator.city.region}`}/>
                </Modal>
            )}
            <PosterContainer>
                <TitleContainer>
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
                                onClick={() => setLocationRequest(true)}>
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
                        <TagLink onClick={() => navigate(`/?category=${poster.category}`)}>{Category[poster.category]}</TagLink>
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

                <ManageButtonContainer>
                    <ManageButton color="#4caf50" onClick={async () => {
                        const result = await moderatePoster(jwtTokens!.accessToken, poster.id, true, poster.isActive);
                        if (result !== null) {
                            toast.warn(`Poster ${poster.title} allowed!`);
                            navigate("/user#myPosters");
                        } else toast.error("Poster moderation failed!");
                    }}>
                        ALLOW
                    </ManageButton>
                    <ManageButton color="#d15241" onClick={async () => {
                        const result = await moderatePoster(jwtTokens!.accessToken, poster.id, false, false);
                        if (result !== null) {
                            toast.warn(`Poster ${poster.title} blocked!`);
                            navigate("/user#myPosters");
                        } else toast.error("Poster moderation failed!");
                    }}>
                        BLOCK
                    </ManageButton>
                </ManageButtonContainer>
            </PosterContainer>
        </Container>
    );
}


export default ModeratePosterDetail;