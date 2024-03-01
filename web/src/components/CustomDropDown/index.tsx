import React from 'react';
import Select from 'react-select';

export interface DropDownOptionProps {
    value: string;
    label: string;
}

export interface CustomDropDownProps {
    defaultValue?: DropDownOptionProps;
    options?: DropDownOptionProps[];
    onChange?: (option: DropDownOptionProps) => void;
}

const CustomDropDown = ({defaultValue, options, onChange}: CustomDropDownProps) => (
    <Select
        defaultValue={defaultValue}
        options={options}
        onChange={(selectedOption) => onChange && selectedOption && onChange(selectedOption)}
    />
);

export default CustomDropDown;
