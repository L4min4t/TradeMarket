import useAuthContext from "../../context/hooks";
import {useEffect, useState} from "react";
import {getPoster, PosterDto} from "../../api/posters";
import PosterDetail from "../../components/PosterDetail";
import {StyledTitle} from "../../components/GlobalStyles";
import {useParams} from "react-router-dom";

const PosterPage = () => {
    const {user, jwtTokens} = useAuthContext();
    const [poster, setPoster] = useState<PosterDto | null>(null);
    const {id} = useParams();

    useEffect(() => {
        async function getResponse() {
            if (typeof id === 'string') {
                const result = await getPoster(jwtTokens!.accessToken, id);

                if (result) {
                    setPoster(result as PosterDto);
                }
            } else setPoster(null);
        }

        getResponse();
    }, [id]);
    if (poster !== null) {
        return (
            <PosterDetail poster={poster!}/>
        );
    } else {
        return (<StyledTitle>Posters info not found!</StyledTitle>);
    }


}

export default PosterPage;