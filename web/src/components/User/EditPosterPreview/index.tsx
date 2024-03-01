import React, {useState} from "react";

import {changePosterStatus, deletePoster, PosterDto} from "../../../api/posters";
import CustomIcon from "../../CustomIcon";
import {getFormattedDate} from "../../../utils/date";
import {useNavigate} from "react-router-dom";
import {
    HighlightedContainer,
    PreviewContainer,
    PreviewImage,
    PreviewInfoContainer,
    PreviewPosterInfo,
    PreviewPosterTitle,
    Price,
    RowContainer
} from "./styles";
import useAuthContext from "../../../context/hooks";
import {toast} from "react-toastify";


interface EditPosterPreviewProps {
    poster: PosterDto;
    removePoster: (id: string) => void;
}

const EditPosterPreview = ({poster, removePoster}: EditPosterPreviewProps) => {
    const navigate = useNavigate();
    const {jwtTokens} = useAuthContext();
    const [isActive, setActivity] = useState<boolean>(poster.isActive);

    const imgUrl = `${process.env.REACT_APP_BASE_URL}/Images/${(poster.imageId || "basket")}.jpg`;

    const handleChangeActivity = async () => {
        await changePosterStatus(jwtTokens!.accessToken, poster.id, !isActive);
        setActivity(!isActive);
    }

    const handleDeleteClick = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this poster?');
        if (isConfirmed) {

            const result = await deletePoster(jwtTokens!.accessToken, poster.id);
            if (result !== null) {
                toast.success("Poster deleted");
                removePoster(poster.id);
            }
        }
    };

    return (
        <PreviewContainer key={`poster-${poster.id}`}>
            <PreviewImage onClick={() => navigate(`/posters/${poster.id}`)} src={imgUrl}/>
            <PreviewInfoContainer>
                <PreviewPosterTitle
                    onClick={() => navigate(`/posters/${poster.id}`)}>{poster.title}
                </PreviewPosterTitle>
                <Price onClick={() => navigate(`/posters/${poster.id}`)}>
                    <CustomIcon src={"uah.png"} width={"20px"}/> {poster.price.toString()}
                </Price>
                <PreviewPosterInfo>
                    {
                        poster.isModerated
                            ? <RowContainer><CustomIcon src="checked.png" width="22px"/><p>Moderated</p></RowContainer>
                            :
                            <RowContainer><CustomIcon src="block.png" width="22px"/><p>Not moderated</p></RowContainer>
                    }
                </PreviewPosterInfo>
                <PreviewPosterInfo onClick={() => handleChangeActivity()}>

                    {
                        isActive
                            ? <RowContainer>
                                <CustomIcon src="on-button.png" width="42px"/><p>Active</p>
                            </RowContainer>
                            : <RowContainer>
                                <CustomIcon src="off-button.png" width="42px"/><p>Deactivated</p>
                            </RowContainer>
                    }
                </PreviewPosterInfo>
                <RowContainer>
                    <HighlightedContainer onClick={() => navigate(`/edit/${poster.id}`)}>
                        <CustomIcon src="pencil.png" height="22px"/><p>Edit</p>
                    </HighlightedContainer>
                    <HighlightedContainer onClick={() => handleDeleteClick()}>
                        <CustomIcon src="trash.png" height="22px"/><p>Delete</p>
                    </HighlightedContainer>
                </RowContainer>


                <PreviewPosterInfo onClick={() => navigate(`/posters/${poster.id}`)}>
                    {getFormattedDate(poster.publishedAt)}
                </PreviewPosterInfo>

            </PreviewInfoContainer>
        </PreviewContainer>
    );
};

export default EditPosterPreview;