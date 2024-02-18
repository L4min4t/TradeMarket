import styled from "styled-components";
import {cssValues} from "../GlobalStyles";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    background-color: white;
    padding: ${cssValues.blocksGap};
    border-radius: 5px;
    position: relative;
    z-index: 1001;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 3px;
    right: 10px;
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
`;