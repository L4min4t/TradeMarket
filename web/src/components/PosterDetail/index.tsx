import {PosterDto} from "../../api/posters";
import {cssValues, FlexContainer} from "../GlobalStyles";
import styled from "styled-components";

interface PosterDetailProps {
    poster: PosterDto;
}

const PosterDetail = (props: PosterDetailProps) => {

    const imageUrl = process.env.REACT_APP_BASE_URL + "/Images/" + (props.poster.imageId || "basket") + ".jpg";

    return (
        <FlexContainer paddingtop={cssValues.blocksGap} flexdirection={"column"} gap={cssValues.itemsGap}
                       width={"100%"}>
            <h2>{props.poster.title}</h2>
            <PosterDetailImage src={imageUrl}/>
            <p>{props.poster.description}</p>

        </FlexContainer>
    );
}

export const PosterDetailImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 20px;
`;

export default PosterDetail;