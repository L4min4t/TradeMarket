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
    minWidth?: string;
}

const CustomDropDown = ({defaultValue, options, onChange, minWidth = '100px'}: CustomDropDownProps) => (
    <Select
        defaultValue={defaultValue}
        options={options}
        onChange={(selectedOption) => onChange && selectedOption && onChange(selectedOption)}
        styles={{
            control: (provided) => ({
                ...provided,
                minWidth: minWidth,
            }),
        }}
    />
);

export default CustomDropDown;
