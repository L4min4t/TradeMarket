import styled from "styled-components";
import {FlexContainer} from "../GlobalStyles";

export const PostersListContainer = styled(FlexContainer)`
    padding: 10vw;
`;

export const PosterPreviewContainer = styled(FlexContainer)`
    width: 32%;
    height: fit-content;
    background-color: #f8f8f8;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
`;

export const PosterPreviewImage = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 20px;
`;