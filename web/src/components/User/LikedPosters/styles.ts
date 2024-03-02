import styled from "styled-components";
import {cssValues} from "../../GlobalStyles";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: calc(${cssValues.blocksGap} / 2);

    width: 100%;
`;