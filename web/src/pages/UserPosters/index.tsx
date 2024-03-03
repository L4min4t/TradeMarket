import React from "react";
import {UserPostersPageContainer} from "./styles";
import {useParams} from "react-router-dom";
import UserPosters from "../../components/User/UserPosters";
import ShortUserInfo from "../../components/User/ShortUserInfo";


const UserPostersPage = () => {
    const {id} = useParams();

    return (
        <UserPostersPageContainer>
            <ShortUserInfo id={id!}/>
            <UserPosters id={id!}/>
        </UserPostersPageContainer>
    );
};

export default UserPostersPage;