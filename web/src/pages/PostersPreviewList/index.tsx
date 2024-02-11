import React from "react";
import PostersPreviewList from "../../components/PostersPreviewList";
import {PostersPreviewListPageContainer} from "./styles";


const PostersPreviewListPage = () => {
    return (
        <PostersPreviewListPageContainer>
            <PostersPreviewList/>
        </PostersPreviewListPageContainer>
    );
};

export default PostersPreviewListPage;