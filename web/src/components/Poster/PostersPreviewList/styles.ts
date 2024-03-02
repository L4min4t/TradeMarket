import styled from "styled-components";
import {cssValues} from "../../GlobalStyles";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: calc(${cssValues.blocksGap} / 2);
`;

