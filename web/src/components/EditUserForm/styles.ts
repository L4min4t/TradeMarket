import styled from "styled-components";
import {cssValues} from "../GlobalStyles";

export const CustomForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: ${cssValues.itemsGap};
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: ${cssValues.itemsGap};
    align-items: center;
`;

export const DropDownContainer = styled.div`
    width: 100%;
`;

export const CustomInput = styled.input`
    width: 100%;
    height: 44px;
    padding: 0 12px;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
`;

export const Label = styled.label``;

export const SubmitButton = styled.button`
    width: fit-content;
    height: fit-content;
    padding: 10px 20px;
    align-self: center;
    border-radius: ${cssValues.borderRadius};
    background: ${cssValues.mainColor};
`;