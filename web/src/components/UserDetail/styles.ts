import styled from "styled-components";
import {cssValues} from "../GlobalStyles";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Button = styled.a`
    * {
        cursor: pointer;
    }
`;

export const AvatarContainer = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: ${cssValues.borderInteractive};
    overflow: hidden;
`;

export const Avatar = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
`;

export const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: ${cssValues.blocksGap};
    margin-top: ${cssValues.blocksGap};
    margin-bottom: ${cssValues.blocksGap};
`;

export const UserCredentialsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Label = styled.p`
`;

export const UserNameLabel = styled(Label)`
    font-weight: 600;
    font-size: ${cssValues.subTitleFontSize};
    color: ${cssValues.interactiveColor};
`;
export const RowFlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    column-gap: ${cssValues.itemsGap};
`;

export const EditAvatarContainer = styled.div`
    padding: 5px 0 20px 3px;
    position: relative;
    top: -42px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    column-gap: 5px;
    background: rgba(255, 255, 255, 0.5);
`;

export const Title = styled.h1`
    padding-left: ;
`;

export const PostersContaienr = styled.div`
display: flex;
    flex-direction: column;
    row-gap: ${cssValues.itemsGap};
    margin-bottom: ${cssValues.blocksGap};
`;


