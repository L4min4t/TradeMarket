import React, {ChangeEvent} from 'react';
import {uploadImage} from "../../../api/image";
import useAuthContext from "../../../context/hooks";
import CustomIcon from "../../CustomIcon";
import {CustomForm, HiddenFileInput} from "./styles";
import {updateUser, UserUpdateDto} from "../../../api/user";
import {toast} from "react-toastify";

interface AvatarUploadFormProps {
    imageUrl: string;
    imageWidth: string;
    user: UserUpdateDto;
    onAvatarChange: (newAvatarId: string) => void;
}

const AvatarUploadForm = ({imageUrl, imageWidth, user, onAvatarChange}: AvatarUploadFormProps) => {
    const {jwtTokens} = useAuthContext();

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const fileList = event.target.files;
        if (!fileList) return;
        const newId = crypto.randomUUID();
        const userToUpdate = {...user, avatarId: newId};
        const result = await uploadImage(jwtTokens!.accessToken, newId, fileList[0]);
        if (result) {

            toast.success("Image uploaded");
            await updateUser(jwtTokens!.accessToken, userToUpdate);
            onAvatarChange(newId);
        }
    };

    const hiddenFileInputRef = React.createRef<HTMLInputElement>();

    const handleIconClick = () => {
        hiddenFileInputRef.current?.click();
    };

    return (
        <CustomForm>
            <CustomIcon src={imageUrl} width={imageWidth} height={imageWidth} onClick={handleIconClick}/>
            <HiddenFileInput
                type="file"
                id="imageFile"
                ref={hiddenFileInputRef}
                onChange={handleFileChange}
                required
            />
        </CustomForm>
    );
};

export default AvatarUploadForm;
