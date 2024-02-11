import {protectedFetch} from "../common/http";
import {processResponse} from "../common";

import {PosterDto, PosterPreviewDto} from "./interfaces";

import {POSTER_BY_ID_URL, POSTERS_URL} from "./urls";

export const getPosters = async (token: string): Promise<PosterPreviewDto[] | null> => {
    const response = await protectedFetch<PosterPreviewDto[]>(POSTERS_URL, token, {
        method: "get"
    });
    return processResponse(response);
};

export const getPoster = async (token: string, id: string): Promise<PosterDto | null> => {
    const response = await protectedFetch<PosterDto>(`${POSTER_BY_ID_URL(id)}`, token, {
        method: "get"
    });
    return processResponse(response);
}