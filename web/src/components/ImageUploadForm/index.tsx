import useAuthContext from "../../context/hooks";
import React, {ChangeEvent, useRef} from "react";
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
    const hiddenFileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const fileList = event.target.files;
        if (!fileList) return;
        
        const newId = crypto.randomUUID();
        const result = await uploadImage(jwtTokens?.accessToken ?? '', newId, fileList[0]);
        if (result) {
            toast.success("Image uploaded!");
            getImageId(newId);
        } else toast.error("Image upload failed!")
    };

    const handleButtonClick = () => {
        hiddenFileInputRef.current?.click();
    };

    return (
        <CustomForm>
            <HiddenInput
                type="file"
                ref={hiddenFileInputRef}
                onChange={handleFileChange}
                required
            />
            <SubmitButton buttonPadding={buttonPadding} onClick={handleButtonClick}>
                {buttonText}
            </SubmitButton>
        </CustomForm>
    );
};

export default ImageUploadForm;
