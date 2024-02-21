import useAuthContext from "../../context/hooks";
import React, {ChangeEvent} from "react";
import {generateGuid} from "../../utils/guidGenerator";
import {uploadImage} from "../../api/image";
import {CustomForm, HiddenInput, SubmitButton} from "./styled";
import {toast} from "react-toastify";

interface ImageUploadFormProps {
    getImageId: (newImageId: string) => void;
    buttonText: string;
    buttonPadding?: string;
}

const ImageUploadForm = ({
                             getImageId,
                             buttonText,
                             buttonPadding
                         }: ImageUploadFormProps) => {
    const {jwtTokens} = useAuthContext();

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const fileList = event.target.files;
        if (!fileList) return;
        const newId = generateGuid();
        const result = await uploadImage(jwtTokens!.accessToken, newId, fileList[0]);
        if (result) {
            toast.success("Image uploaded");
            getImageId(newId);
        }
    };

    const hiddenFileInputRef = React.createRef<HTMLInputElement>();

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        hiddenFileInputRef.current?.click();
    };

    return (
        <CustomForm>
            <HiddenInput
                type="file"
                id="imageFile"
                ref={hiddenFileInputRef}
                onChange={handleFileChange}
                required
            />
            <SubmitButton buttonPadding={buttonPadding} onClick={handleButtonClick}>{buttonText}</SubmitButton>
        </CustomForm>
    );
};

export default ImageUploadForm;
