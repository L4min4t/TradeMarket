import styled from "styled-components";
import {cssValues} from "../GlobalStyles";

export const HiddenInput = styled.input`
    display: none;
`;

export const CustomForm = styled.form`
    display: flex;
    width: fit-content;
    height: fit-content;

`;

interface SubmitButtonProps {
    buttonPadding?: string;
}

export const SubmitButton = styled.button<SubmitButtonProps>`
    ${props => props.buttonPadding && `padding: ${props.buttonPadding};`};
    width: fit-content;
    height: fit-content;
    align-self: center;
    border-radius: ${cssValues.borderRadius};
    background: ${cssValues.mainColor};
    transition: transform ease-out 0.2s;

    &:hover {
        cursor: pointer;
        transform: scale(1.02);
        background: ${cssValues.interactiveColor};
    }
`;
