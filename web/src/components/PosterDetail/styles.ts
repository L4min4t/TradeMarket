import styled from "styled-components";
import {cssValues} from "../GlobalStyles";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${cssValues.blocksGap};
    margin-bottom: ${cssValues.blocksGap};
`;

export const PosterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${cssValues.blocksGap};
    padding: ${cssValues.blocksGap} 20% 0;
`;


export const PosterDetailImage = styled.img`
    width: 60%;
    max-height: 500px;
    min-height: 400px;
    object-fit: cover;

    border: 1px solid ${cssValues.mainColor};
    border-radius: ${cssValues.borderRadius};
`;

export const Title = styled.h1`
    font-size: ${cssValues.titleFontSize};
    color: ${cssValues.mainColor};
    font-weight: bold;
    width: 100%;
`;

export const MainInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const PosterMainInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${cssValues.itemsGap};
`;

export const PublishTime = styled.p`
    font-weight: 300;
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: ${cssValues.itemsGap};
`;

export const Price = styled.p`
    font-weight: 500;
    font-size: ${cssValues.subTitleFontSize};
`;

export const Sharing = styled.p`
    width: fit-content;
    height: fit-content;
    padding: 4px 8px;
    border-radius: ${cssValues.borderRadius};
    background: ${cssValues.mainColor};
`;

export const Link = styled.a`
    cursor: pointer;
    color: ${cssValues.mainColor};
    font-weight: 300;

    * {
        cursor: pointer;
    }
`;

export const PosterTagsContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: ${cssValues.blocksGap};
`;

export const Tag = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 12px;
    font-weight: 300;
`;

export const TagLink = styled.a`
    cursor: pointer;
`;

export const Description = styled.p`
    width: calc(100% - 21px * 2);
    height: fit-content;
    padding: 20px;
    border-radius: ${cssValues.borderRadius};
    border: 1px solid ${cssValues.mainColor};
`;

export const SuggestedPostersContainer = styled.div`
    position: relative;
    width: 100%;
`;
