﻿import React from "react";
import {UserPostersPageContainer} from "./styles";
import {useParams} from "react-router-dom";
import UserPosters from "../../components/UserPosters";


const UserPostersPage = () => {
    const {id} = useParams();
    console.log(id);

    return (
        <UserPostersPageContainer>
            <UserPosters id={id!}/>
        </UserPostersPageContainer>
    );
};

export default UserPostersPage;