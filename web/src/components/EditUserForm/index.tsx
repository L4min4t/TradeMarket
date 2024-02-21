import React, {useEffect, useState} from 'react';
import {User} from "../../api/user";
import CustomDropDown, {DropDownOptionProps} from "../CustomDropDown";
import {getCities} from "../../api/city";
import useAuthContext from "../../context/hooks";
import {CustomForm, CustomInput, DropDownContainer, Label, RowContainer, SubmitButton} from "./styles";

export interface EditUserFormProps {
    user: User;
    onSave: (user: User) => void;
}

const EditUserForm = ({user, onSave}: EditUserFormProps) => {
    const {jwtTokens} = useAuthContext();
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [telegram, setTelegram] = useState(user.telegram);
    const [options, setOptions] = useState<DropDownOptionProps[] | undefined>();
    const [cityId, setCityId] = useState(user.cityId);

    useEffect(() => {
        async function getResponse() {
            const result = await getCities(jwtTokens!.accessToken);

            if (result) {
                const avaliableOptions = result.map(
                    (city) => ({value: city.id, label: `${city.name}, ${city.region}`} as DropDownOptionProps)
                );
                setOptions(avaliableOptions);
            }
        }

        getResponse();
    }, [jwtTokens]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSave({...user, name, cityId: cityId, phone, telegram});
    };

    return (
        <CustomForm onSubmit={handleSubmit}>
            <RowContainer>
                <Label>Name:</Label>
                <CustomInput type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </RowContainer>
            <RowContainer>
                <Label>Phone:</Label>
                <CustomInput placeholder="380000000000" type="phone" value={phone}
                             onChange={(e) => setPhone(e.target.value)}/>
            </RowContainer>
            <RowContainer>
                <Label>Telegram:</Label>
                <CustomInput placeholder="nickname without @" type="text" value={telegram}
                             onChange={(e) => setTelegram(e.target.value)}/>
            </RowContainer>
            <RowContainer>
                <Label>City:</Label>
                <DropDownContainer>
                    {
                        user.cityId && options?.length
                            ?
                            <CustomDropDown
                                defaultValue={{value: user.cityId, label: `${user.city.name}, ${user.city.region}`}}
                                options={options}
                                onChange={(selectedOption) => setCityId(selectedOption.value)}
                            />
                            :
                            <CustomDropDown
                                options={options}
                                onChange={(selectedOption) => setCityId(selectedOption.value)}
                            />
                    }
                </DropDownContainer>

            </RowContainer>
            <SubmitButton type="submit">save changes</SubmitButton>
        </CustomForm>
    );
};

export default EditUserForm;
