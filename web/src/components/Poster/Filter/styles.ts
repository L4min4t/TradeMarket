import styled from "styled-components";
import {cssValues} from "../../GlobalStyles";

export const FilterElementContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    gap: ${cssValues.blocksGap};
`;

export const FiltersConrtainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 60px;
    row-gap: ${cssValues.itemsGap};
    flex-wrap: wrap;
`;

export const FilterElement = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    justify-content: flex-start;
    align-items: flex-start;
    width: 420px;
`;

export const FilterLabel = styled.p`
    font-size: ${cssValues.subTitleFontSize};
    font-weight: 300;
`;