import styled from "styled-components";
import {cssValues} from "../../GlobalStyles";

export const ShortUserInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: ${cssValues.blocksGap};
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const Avatar = styled.img`
    width: 260px;
    height: 260px;
    object-fit: cover;
    border-radius: 50%;
    border: ${cssValues.borderInteractive};
`;

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    row-gap: ${cssValues.itemsGap};
`;


export const Name = styled.p`
    color: ${cssValues.interactiveColor};
    font-size: ${cssValues.subTitleFontSize};
    font-weight: 500;
`;

export const City = styled.p`
    font-weight: 300;
`;

export const Contact = styled.a`
    font-weight: 300;
    cursor: pointer;
`;

export const ContactContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: ${cssValues.itemsGap};
    align-items: center;
    justify-content: flex-start;
`;