import {FilterElement, FilterElementContainer, FilterLabel, FiltersConrtainer} from "./styles";
import PostersPreviewList from "../PostersPreviewList";
import useAuthContext from "../../../context/hooks";
import React, {useEffect, useState} from "react";
import {getLikedPosters, getPublishedPosters, PosterDto} from "../../../api/posters";
import CustomDropDown, {DropDownOptionProps} from "../../CustomDropDown";
import {getCities} from "../../../api/city";
import {Category} from "../../../api/constants/enums";

interface FilterProps {
    price?: number;
    time?: number;
    city?: string;
}

const Filter = ({price = 0, time = 0, city = "0"}: FilterProps) => {
    const {user, jwtTokens} = useAuthContext();
    const [posters, setPosters] = useState<PosterDto[]>([]);
    const [postersToDisplay, setPostersToDisplay] = useState<PosterDto[]>([]);
    const [sortFilter, setSortFilter] = useState<number>(price);
    const [timeFilter, setTimeFilter] = useState<number>(time);
    const [cityOptions, setCityOptions] = useState<DropDownOptionProps[] | undefined>();
    const [cityFilter, setCityFilter] = useState<string>(city);
    const [categoryFilter, setCategoryFilter] = useState<number>(-1);

    useEffect(() => {
            async function getResponse() {
                const likeResult = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);
                const result = await getPublishedPosters(jwtTokens!.accessToken);
                if (result) {
                    const updatedPosters = result.map((poster) => {
                        if (likeResult && likeResult.includes(poster.id)) {
                            return {...poster, isLiked: true};
                        }
                        return {...poster, isLiked: false};
                    });

                    setPosters(updatedPosters);
                    setPostersToDisplay(updatedPosters);
                }

                const cityResult = await getCities(jwtTokens!.accessToken);

                if (cityResult) {
                    const availableOptions = cityResult
                        .sort((a, b) => {
                            if (a.region < b.region) return -1;
                            if (a.region > b.region) return 1;

                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;

                            return 0;
                        })
                        .map((city) => ({
                            value: city.id,
                            label: `${city.name}, ${city.region}`
                        }))
                    availableOptions!.unshift({value: "0", label: "All"} as DropDownOptionProps);
                    setCityOptions(availableOptions);
                }
            }

            getResponse();
        }, [jwtTokens, user]
    );

    useEffect(() => {
        let filteredPosters = [...posters];

        if (sortFilter === 1) {
            filteredPosters.sort((a, b) => a.price - b.price);
        } else if (sortFilter === 2) {
            filteredPosters.sort((a, b) => b.price - a.price);
        } else if (sortFilter === 3) {
            filteredPosters.sort((a, b) => a.numberViewed - b.numberViewed);
        } else if (sortFilter === 4) {
            filteredPosters.sort((a, b) => b.numberViewed - a.numberViewed);
        } else if (sortFilter === 5) {
            filteredPosters.sort((a, b) => a.numberLiked - b.numberLiked);
        } else if (sortFilter === 6) {
            filteredPosters.sort((a, b) => b.numberLiked - a.numberLiked);
        }

        if (timeFilter === 1) {
            filteredPosters.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        } else if (timeFilter === 2) {
            filteredPosters.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        }

        if (cityFilter !== "0") {
            filteredPosters = filteredPosters.filter((posters) => posters?.creator?.city?.id === cityFilter)
        }

        if (categoryFilter >= 0) {
            filteredPosters = filteredPosters.filter((poster) => poster.category === categoryFilter);
        }


        setPostersToDisplay(filteredPosters);
    }, [sortFilter, timeFilter, cityFilter, categoryFilter]);

    const sortOptions = [
        {value: "0", label: "default"} as DropDownOptionProps,
        {value: "1", label: "price increase"} as DropDownOptionProps,
        {value: "2", label: "price decrease"} as DropDownOptionProps,
        {value: "3", label: "views increase"} as DropDownOptionProps,
        {value: "4", label: "views decrease"} as DropDownOptionProps,
        {value: "5", label: "likes increase"} as DropDownOptionProps,
        {value: "6", label: "likes decrease"} as DropDownOptionProps,
    ]

    const timeOptions = [
        {value: "0", label: "default"} as DropDownOptionProps,
        {value: "1", label: "fist new"} as DropDownOptionProps,
        {value: "2", label: "first old"} as DropDownOptionProps
    ]

    const categryOptions: DropDownOptionProps[] = Object.keys(Category)
        .filter((key) => isNaN(Number(key)))
        .map((key) => {
            return {
                value: Category[key as keyof typeof Category].toString(),
                label: key
            };
        });
    categryOptions.unshift({value: "-1", label: "All"});

    return (
        <FilterElementContainer>
            <FiltersConrtainer>
                <FilterElement>
                    <FilterLabel>Category:</FilterLabel>
                    <CustomDropDown
                        minWidth="420px"
                        options={categryOptions}
                        onChange={(selectedOption) => {
                            const valueAsNumber = Number(selectedOption.value);
                            if (!isNaN(valueAsNumber)) {
                                setCategoryFilter(valueAsNumber);
                            }
                        }}
                    />
                </FilterElement>

                <FilterElement>
                    <FilterLabel>Order:</FilterLabel>
                    <CustomDropDown
                        minWidth="420px"
                        options={sortOptions}
                        onChange={(selectedOption) => setSortFilter(Number(selectedOption.value))}
                    />
                </FilterElement>

                <FilterElement>
                    <FilterLabel>Time</FilterLabel>
                    <CustomDropDown
                        minWidth="420px"
                        options={timeOptions}
                        onChange={(selectedOption) => setTimeFilter(Number(selectedOption.value))}
                    />
                </FilterElement>

                <FilterElement>
                    <FilterLabel>City:</FilterLabel>
                    <CustomDropDown
                        minWidth="420px"
                        options={cityOptions}
                        onChange={(selectedOption) => setCityFilter(selectedOption.value)}
                    />
                </FilterElement>

            </FiltersConrtainer>
            <PostersPreviewList posters={postersToDisplay}/>
        </FilterElementContainer>
    );
}

export default Filter;