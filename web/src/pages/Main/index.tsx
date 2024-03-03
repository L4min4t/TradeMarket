import React from "react";
import {MainPageContainer} from "./styles";
import Filter from "../../components/Poster/Filter";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const MainPage = () => {
    let query = useQuery();
    let categoryValue = query.get("category");
    let cityValue = query.get("city");

    let category = categoryValue ? parseInt(categoryValue, 10) : -1;
    let city = cityValue ? cityValue : "0";

    return (
        <MainPageContainer>
            <Filter category={category} city={city}/>
        </MainPageContainer>
    );
};

export default MainPage;