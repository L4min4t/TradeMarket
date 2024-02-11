import styled from "styled-components";
import {cssValues} from "../../components/GlobalStyles";

export const Container = styled.div`
    width: ${cssValues.widthAuthForm};

    display: flex;
    flex-direction: column;
    row-gap: ${cssValues.blocksGap};
    margin: auto;
`;

export const Label = styled.h1`
    align-self: center;
    color: ${cssValues.mainColor};
    font-size: ${cssValues.subTitleFontSize};
    font-weight: bold;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: ${cssValues.itemsGap};

    width: 100%;
    height: fit-content;
`;

export const Input = styled.input`
    border: ${cssValues.border};
    border-radius: ${cssValues.borderRadius};
    padding: 6px 8px;

    &:hover {
        border-color: ${cssValues.interactiveColor};
    }

    &:focus {
        outline-color: ${cssValues.interactiveColor};
    }
`;

export const SubmitButton = styled.button`
    width: fit-content;
    height: fit-content;

    align-self: center;

    padding: 8px 12px;

    border: ${cssValues.border};
    border-radius: ${cssValues.borderRadius};

    background: ${cssValues.mainColor};

    &:hover {
        background: ${cssValues.hoverBackgroundColor};
    }
`;

export const SuggestText = styled.p`

`;

export const AuthLink = styled.a`
    background: none;
    border: none;

    color: ${cssValues.mainColor};

    width: fit-content;
    height: fit-content;

    &:visited {
        color: ${cssValues.hoverBackgroundColor};
    }
`;