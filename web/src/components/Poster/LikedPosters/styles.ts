import styled from "styled-components";
import {cssValues} from "../../GlobalStyles";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: calc(${cssValues.blocksGap} / 2);
    flex-wrap: wrap;

    width: 100%;
`;

export const Titile = styled.p`
    font-weight: 300;
    font-size: ${cssValues.subTitleFontSize};
    align-self: center;
`;