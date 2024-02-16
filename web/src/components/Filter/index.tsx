import {FilterElementContainer, FiltersConrtainer} from "./styles";
import PostersPreviewList from "../PostersPreviewList";
import useAuthContext from "../../context/hooks";
import {useEffect, useState} from "react";
import {getLikedPosters, getPosters, PosterPreviewDto} from "../../api/posters";

const Filter = () => {
    const {user, jwtTokens} = useAuthContext();
    const [posters, setPosters] = useState<PosterPreviewDto[]>([]);

    useEffect(() => {
            async function getResponse() {
                const likeResult = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);
                const result = await getPosters(jwtTokens!.accessToken);
                if (result) {
                    const updatedPosters = result.map((poster) => {
                        if (likeResult && likeResult.includes(poster.id)) {
                            return {...poster, isLiked: true};
                        }
                        return {...poster, isLiked: false};
                    });
                    setPosters(updatedPosters);
                }
            }

            getResponse();
        }, [jwtTokens, user]
    );

    return (
        <FilterElementContainer>
            <FiltersConrtainer>
                <p>category</p>
                <p>price</p>
                <p>time</p>
                <p>city</p>
            </FiltersConrtainer>
            <PostersPreviewList posters={posters}/>
        </FilterElementContainer>
    );
}

export default Filter;