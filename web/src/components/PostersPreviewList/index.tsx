import React from "react";

import {PosterPreviewDto} from "../../api/posters";

import {Container} from "./styles";
import PosterPreview from "../PosterPreview";

interface PostersPreviewListProps {
    posters: PosterPreviewDto[];
}

const PostersPreviewList = ({posters}: PostersPreviewListProps) => {
    return (
        <Container>
            {posters.map((poster) => (
                <PosterPreview key={poster.id} poster={poster}/>
            ))}
        </Container>
    );
};

export default PostersPreviewList;
