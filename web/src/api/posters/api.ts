import {protectedFetch} from "../common/http";
import {processResponse} from "../common";

import {PosterDto, PosterPreviewDto} from "./interfaces";

import {LIKE_POSTER_URL, LIKED_POSTERS_URL, POSTER_BY_ID_URL, POSTERS_URL, VIEW_POSTER_URL} from "./urls";

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

export const getLikedPosters = async (token: string, id: string): Promise<PosterPreviewDto[] | null> => {
    const response = await protectedFetch<PosterPreviewDto[]>(`${LIKED_POSTERS_URL(id)}`, token, {
        method: "get"
    });
    return processResponse(response);
}

export const likePoster = async (
    id: string,
    token: string
): Promise<void> => {
    await protectedFetch<string>(`${LIKE_POSTER_URL(id)}`, token, {
        method: "put"
    });
};

export const viewPoster = async (token: string, id: string): Promise<void> => {
    await protectedFetch<null>(`${VIEW_POSTER_URL(id)}`, token, {
        method: "put"
    });
}