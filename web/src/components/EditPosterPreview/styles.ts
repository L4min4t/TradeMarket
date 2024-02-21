import styled from "styled-components";
import {cssValues} from "../GlobalStyles";

export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    width: calc((100% - 2% * 4) / 5);
    background-color: #f8f8f8;
    border-radius: ${cssValues.borderRadius};
    overflow: hidden;
    box-shadow: ${cssValues.boxShadow};

    &:hover {
        box-shadow: ${cssValues.hoverBoxShadow};
    }
`;

export const PreviewImage = styled.img`
    cursor: pointer;
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;

    border-radius: ${cssValues.borderRadius};
`;

export const PreviewInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    width: calc(100% - 15px * 2);

    padding: 0 15px 8px;
`;

export const PreviewPosterTitle = styled.h2`
    cursor: pointer;
    font-weight: 600;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    font-size: ${cssValues.subTitleFontSize};
    color: ${cssValues.mainColor};
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    column-gap: 8px;

    * {
        cursor: pointer;
        font-weight: 300;
    }
`;

export const PreviewPosterInfo = styled.div`
    cursor: pointer;

    * {
        cursor: pointer;
        font-weight: 300;
    }

    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
`;

export const Price = styled.p`
    cursor: pointer;

    * {
        cursor: pointer;
    }

    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    font-weight: 600;
`;
