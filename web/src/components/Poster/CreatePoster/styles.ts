import styled from "styled-components";
import {cssValues} from "../../GlobalStyles";

export const Container = styled.form`
    width: 70%;
    max-width: 780px;
    margin: ${cssValues.blocksGap} auto;
    display: flex;
    flex-direction: column;
    row-gap: ${cssValues.itemsGap};
`;

export const Label = styled.label`
    font-size: ${cssValues.subTitleFontSize};
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: ${cssValues.itemsGap};
    width: 100%;
    justify-content: flex-start;
    align-items: center;

`;

export const CategoryContainer = styled.div`
    display: inline;
    width: 100%;
    max-width: 320px;
`;

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Input = styled.input`
    width: 100%;
    max-width: 780px;
    height: 44px;
    padding: 0 12px;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
`;

export const Price = styled.input`
    width: fit-content;
    height: 44px;
    padding: 0 12px;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    -moz-appearance: textfield;
`;

export const TextArea = styled.textarea`
    width: 100%;
    max-width: 780px;
    height: 220px;
    padding: 12px 20px;
    resize: none;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
`;

export const ImagePreview = styled.img`
    width: 100%;
    max-width: 780px;
    height: auto;
    max-height: 500px;
    object-fit: cover;
    border-radius: ${cssValues.borderRadius};
`;

export const Button = styled.button`
    padding: 3px 8px;
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

export const CheckBox = styled.input`
    width: 18px;
    height: 18px;
`;

export const SubmitButton = styled.button`
    padding: 6px 20px;
    width: fit-content;
    height: fit-content;
    align-self: flex-start;
    border-radius: ${cssValues.borderRadius};
    background: ${cssValues.mainColor};
    font-size: ${cssValues.subTitleFontSize};
    transition: transform ease-out 0.2s;


    &:hover {
        cursor: pointer;
        transform: scale(1.02);
        background: ${cssValues.interactiveColor};
    }
`;