import React from "react";
import PostersPreviewList from "../../components/PostersPreviewList";
import {UserPostersPageContainer} from "./styles";
import {useParams} from "react-router-dom";


const UserPostersPage = () => {
    const {id} = useParams();

    return (
        <UserPostersPageContainer>
            <PostersPreviewList creatorId={id}/>
        </UserPostersPageContainer>
    );
};

export default UserPostersPage;