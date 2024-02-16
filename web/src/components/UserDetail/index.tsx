﻿import {updateUser, User, UserUpdateDto} from "../../api/user";
import CustomIcon from "../CustomIcon";
import {
    Avatar,
    AvatarContainer,
    Button,
    Container,
    EditAvatarContainer,
    Label,
    PostersContaienr,
    RowFlexContainer,
    Title,
    UserCredentialsContainer,
    UserInfoContainer,
    UserNameLabel
} from "./styles";
import useAuthContext from "../../context/hooks";
import LikedPosters from "../LikedPosters";
import AvatarUploadForm from "../AvatarUploadForm";
import React, {useState} from "react";
import {deleteImage} from "../../api/image";
import UserPosters from "../UserPosters";
import Modal from "../Modal";
import EditUserForm from "../EditUserForm";


interface UserDetailProps {
    user: User;
}

const UserDetail = ({user}: UserDetailProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const {jwtTokens, logoutUser} = useAuthContext();
    const [avatarId, setAvatarId] = useState<string | undefined>(user.avatarId);
    const {city, ...userWithoutCity} = user;

    let avatarUrl = `${process.env.REACT_APP_BASE_URL}/Images/${avatarId || "user"}.jpg`;

    const handleEditSave = async (updatedUser: UserUpdateDto) => {
        await updateUser(jwtTokens!.accessToken, updatedUser);
        setIsEditing(false);
        // how to refresh user and header?
    };

    return (
        <Container>
            {isEditing && (
                <Modal width="500px" height="auto" onClose={() => setIsEditing(false)}>
                    <EditUserForm user={user} onSave={handleEditSave}/>
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
                                if (avatarId !== "user") await deleteImage(jwtTokens!.accessToken, user.avatarId);
                                await updateUser(jwtTokens!.accessToken, {...userWithoutCity, avatarId: undefined});
                                await setAvatarId(undefined);
                            }}
                            height="22px"/>
                    </EditAvatarContainer>

                </AvatarContainer>


                <UserCredentialsContainer>
                    <RowFlexContainer>
                        <UserNameLabel>{user.name}</UserNameLabel>
                        <Button onClick={() => setIsEditing(true)}>
                            <CustomIcon src={"edit.png"} width="30px"/>
                        </Button>
                        <Button onClick={logoutUser}>
                            <CustomIcon src={"logout.png"} width="30px"/>
                        </Button>
                    </RowFlexContainer>

                    <RowFlexContainer>
                        <CustomIcon src={"email.png"} width="26px"/>
                        {(user.email && <Label>{user.email}</Label>) || <Label>unknown email</Label>}
                    </RowFlexContainer>
                    <RowFlexContainer>
                        <CustomIcon src={"phone.png"} width="26px"/>
                        {(user.phone && <Label>{user.phone}</Label>) || <Label>unknown phone</Label>}
                    </RowFlexContainer>
                    <RowFlexContainer>
                        <CustomIcon src={"telegram.png"} width="26px"/>
                        {(user.telegram && <Label>{user.telegram}</Label>) || <Label>unknown telegram</Label>}
                    </RowFlexContainer>
                    <RowFlexContainer>
                        <CustomIcon src={"spot.png"} width="26px"/>
                        {
                            (user.cityId && <Label>{user.city?.name}, {user.city?.region}</Label>) ||
                            <Label>unknown city</Label>
                        }
                    </RowFlexContainer>
                </UserCredentialsContainer>

            </UserInfoContainer>

            <PostersContaienr>
                <Title>Liked</Title>
                <LikedPosters/>
                <Title>My posters</Title>
                <UserPosters id={user.id}/>
            </PostersContaienr>


        </Container>
    );
}

export default UserDetail;