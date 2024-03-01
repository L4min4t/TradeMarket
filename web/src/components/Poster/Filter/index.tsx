import {FilterElementContainer, FiltersConrtainer} from "./styles";
import PostersPreviewList from "../PostersPreviewList";
import useAuthContext from "../../../context/hooks";
import React, {useEffect, useState} from "react";
import {getLikedPosters, getPublishedPosters, PosterPreviewDto} from "../../../api/posters";
import CustomDropDown, {DropDownOptionProps} from "../../CustomDropDown";
import {getCities} from "../../../api/city";
import {Category} from "../../../api/constants/enums";

interface FilterProps {
    price?: number;
    time?: number;
    city?: string;
}

const Filter = ({price = 0, time = 0, city = "-"}: FilterProps) => {
    const {user, jwtTokens} = useAuthContext();
    const [posters, setPosters] = useState<PosterPreviewDto[]>([]);
    const [priceFilter, setPriceFilter] = useState<number>(price);
    const [timeFilter, setTimeFilter] = useState<number>(time);
    const [cityOptions, setCityOptions] = useState<DropDownOptionProps[] | undefined>();
    const [cityFilter, setCityFilter] = useState<string>(city);
    const [categoryFilter, setCategoryFilter] = useState<number>(-1);

    useEffect(() => {
            async function getResponse() {
                const likeResult = (await getLikedPosters(jwtTokens!.accessToken, user!.id))?.map((poster) => poster.id);
                const result = await getPublishedPosters(jwtTokens!.accessToken);
                if (result ) {
                    const updatedPosters = result.map((poster) => {
                        if (likeResult && likeResult.includes(poster.id)) {
                            return {...poster, isLiked: true};
                        }
                        return {...poster, isLiked: false};
                    });

                    setPosters(updatedPosters);
                }

                const cityResult = await getCities(jwtTokens!.accessToken);

                if (cityResult) {
                    const avaliableOptions = cityResult.map(
                        (city) => ({value: city.id, label: `${city.name}, ${city.region}`} as DropDownOptionProps)
                    );
                    avaliableOptions.unshift({value: city, label: "city filter"} as DropDownOptionProps)
                    setCityOptions(avaliableOptions);
                }
            }

            getResponse();
        }, [jwtTokens, user]
    );

    useEffect(() => {
        const filteredPosters = [...posters];

        if (priceFilter === 1) {
            filteredPosters.sort((a, b) => a.price - b.price);
        } else if (priceFilter === 2) {
            filteredPosters.sort((a, b) => b.price - a.price);
        }

        if (timeFilter === 1) {
            filteredPosters.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        } else if (timeFilter === 2) {
            filteredPosters.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        }

        if (cityFilter !== "-") {
            filteredPosters.filter((posters) => posters?.creator?.city?.id === cityFilter)
        }

        setPosters(filteredPosters);
    }, [priceFilter, timeFilter, cityFilter]);

    const priceOptions = [
        {value: "0", label: "price filter"} as DropDownOptionProps,
        {value: "1", label: "price decrease"} as DropDownOptionProps,
        {value: "2", label: "price increase"} as DropDownOptionProps
    ]

    const timeOptions = [
        {value: "0", label: "time filter"} as DropDownOptionProps,
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

    return (
        <FilterElementContainer>
            <FiltersConrtainer>
                <CustomDropDown
                    defaultValue={{value: Category.None.toString(), label: `Without category`}}
                    options={categryOptions}
                    onChange={(selectedOption) => {
                        const valueAsNumber = Number(selectedOption.value);
                        if (!isNaN(valueAsNumber)) {
                            setCategoryFilter(valueAsNumber);
                        }
                    }}
                />
                <CustomDropDown
                    defaultValue={priceOptions[0]}
                    options={priceOptions}
                    onChange={(selectedOption) => setPriceFilter(Number(selectedOption.value))}
                />
                <CustomDropDown
                    defaultValue={timeOptions[0]}
                    options={timeOptions}
                    onChange={(selectedOption) => setTimeFilter(Number(selectedOption.value))}
                />
                <CustomDropDown
                    defaultValue={{value: city, label: "city filter"}}
                    options={cityOptions}
                    onChange={(selectedOption) => setCityFilter(selectedOption.value)}
                />
            </FiltersConrtainer>
            <PostersPreviewList posters={posters}/>
        </FilterElementContainer>
    );
}

export default Filter;