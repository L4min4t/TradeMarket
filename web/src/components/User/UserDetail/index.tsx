import {updateUser, User, UserUpdateDto} from "../../../api/user";
import CustomIcon from "../../CustomIcon";
import {
    Avatar,
    AvatarContainer,
    Button,
    ChangePasswordContainer,
    Container,
    EditAvatarContainer,
    Input,
    Label,
    PasswordChangeForm,
    PasswordChangeTitle,
    PostersContaienr,
    RowFlexContainer,
    SubmitButton,
    Title,
    UserCredentialsContainer,
    UserInfoContainer,
    UserNameLabel
} from "./styles";
import useAuthContext from "../../../context/hooks";
import LikedPosters from "../LikedPosters";
import AvatarUploadForm from "../AvatarUploadForm";
import React, {useState} from "react";

import Modal from "../../Modal";
import EditUserForm from "../EditUserForm";
import OwnedPostersPreviewList from "../OwnedPostersList";
import {toast} from "react-toastify";
import PostersToModerateList from "../PostersToModerateList";


interface UserDetailProps {
    userObj: User;
}

const UserDetail = ({userObj}: UserDetailProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const {user, jwtTokens, logoutUser, refreshToken, changePassword} = useAuthContext();
    const [avatarId, setAvatarId] = useState<string | undefined>(userObj.avatarId);
    const {city, ...userWithoutCity} = userObj;
    const [oldPassword, setOldPassword] = useState<string | undefined>();
    const [newPassword, setNewPassword] = useState<string | undefined>();
    let avatarUrl = `${process.env.REACT_APP_BASE_URL}/Images/${avatarId || "user"}.jpg`;

    const handleEditSave = async (updatedUser: UserUpdateDto) => {
        await updateUser(jwtTokens!.accessToken, updatedUser);
        setIsEditing(false);
        refreshToken(jwtTokens!);
    };

    const handlePasswordChangeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (oldPassword === undefined) {
            toast.error("Fill old password field!");
            return;
        }

        if (newPassword === undefined) {
            toast.error("Fill new password field!");
            return;
        }

        if (await changePassword(oldPassword, newPassword)) toast.success("Password updated!");
    }

    return (
        <Container>
            {isEditing && (
                <Modal width="500px" height="auto" onClose={() => setIsEditing(false)}>
                    <EditUserForm user={userObj} onSave={handleEditSave}/>
                </Modal>
            )}

            <UserInfoContainer>
                <AvatarContainer>
                    <Avatar src={avatarUrl}/>
                    <EditAvatarContainer>
                        <AvatarUploadForm
                            imageWidth="24px"
                            imageUrl="camera.png"
                            user={userWithoutCity}
                            onAvatarChange={(newAvatarId: string) => {
                                setAvatarId(newAvatarId); // This will trigger a re-render of UserDetail
                            }}
                        />
                        <CustomIcon
                            src="trash.png"
                            onClick={async () => {
                                await updateUser(jwtTokens!.accessToken, {...userWithoutCity, avatarId: undefined});
                                await setAvatarId(undefined);
                            }}
                            height="22px"/>
                    </EditAvatarContainer>

                </AvatarContainer>


                <UserCredentialsContainer>
                    <RowFlexContainer>
                        <UserNameLabel>{userObj.name}</UserNameLabel>
                        <Button onClick={() => setIsEditing(true)}>
                            <CustomIcon src={"edit.png"} width="30px"/>
                        </Button>
                        <Button onClick={logoutUser}>
                            <CustomIcon src={"logout.png"} width="30px"/>
                        </Button>
                    </RowFlexContainer>

                    <RowFlexContainer>
                        <CustomIcon src={"email.png"} width="26px"/>
                        {(userObj.email && <Label>{userObj.email}</Label>) || <Label>unknown email</Label>}
                    </RowFlexContainer>
                    <RowFlexContainer>
                        <CustomIcon src={"phone.png"} width="26px"/>
                        {(userObj.phone && <Label>{userObj.phone}</Label>) || <Label>unknown phone</Label>}
                    </RowFlexContainer>
                    <RowFlexContainer>
                        <CustomIcon src={"telegram.png"} width="26px"/>
                        {(userObj.telegram && <Label>{userObj.telegram}</Label>) || <Label>unknown telegram</Label>}
                    </RowFlexContainer>
                    <RowFlexContainer>
                        <CustomIcon src={"spot.png"} width="26px"/>
                        {
                            (userObj.cityId && <Label>{userObj.city?.name}, {userObj.city?.region}</Label>) ||
                            <Label>unknown city</Label>
                        }
                    </RowFlexContainer>
                </UserCredentialsContainer>

                <ChangePasswordContainer>
                    <PasswordChangeTitle>Change password</PasswordChangeTitle>
                    <PasswordChangeForm onSubmit={handlePasswordChangeSubmit}>
                        <Input
                            type="password"
                            placeholder="old pasword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="new pasword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <SubmitButton type="submit">change</SubmitButton>
                    </PasswordChangeForm>

                </ChangePasswordContainer>

            </UserInfoContainer>

            <PostersContaienr>
                <Title>Liked</Title>
                <LikedPosters/>
                <Title id="#myPosters">My posters</Title>
                <OwnedPostersPreviewList/>
                {
                    user!.role.includes("Admin")
                        ? <>
                            <Title id="#moderatePosters">To moderate</Title>
                            <PostersToModerateList/>
                        </>
                        : <></>
                }
            </PostersContaienr>


        </Container>
    );
}

export default UserDetail;