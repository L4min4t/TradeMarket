import styled from "styled-components";
import {cssValues} from "../../GlobalStyles";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: calc(${cssValues.blocksGap} / 2);

    width: 100%;
`;


export const CreatePoster = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    min-width: 300px;
    width: calc((100% - 2% * 4) / 5);
    min-height: 300px;
    background-color: #f8f8f8;
    border-radius: ${cssValues.borderRadius};
    overflow: hidden;
    box-shadow: ${cssValues.boxShadow};

    &:hover {
        box-shadow: ${cssValues.hoverBoxShadow};
    }
`;

