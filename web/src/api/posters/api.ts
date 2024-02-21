import {protectedFetch} from "../common/http";
import {processResponse} from "../common";

import {PosterCreateDto, PosterDto, PosterPreviewDto} from "./interfaces";

import {
    CHANGE_POSTERS_STATUS_URL,
    CREATE_POSTER_URL,
    DELETE_POSTER_URL,
    LIKE_POSTER_URL,
    LIKED_POSTERS_URL,
    POSTER_BY_ID_URL,
    PUBLISHED_POSTERS_URL,
    USER_POSTERS_URL,
    VIEW_POSTER_URL
} from "./urls";

export const getPublishedPosters = async (token: string): Promise<PosterPreviewDto[] | null> => {
    const response = await protectedFetch<PosterPreviewDto[]>(PUBLISHED_POSTERS_URL, token, {
        method: "get"
    });
    return processResponse(response);
};

export const getUserPosters = async (token: string): Promise<PosterDto[] | null> => {
    const response = await protectedFetch<PosterDto[]>(USER_POSTERS_URL, token, {
        method: "get"
    });
    return processResponse(response);
};

export const changePosterStatus = async (token: string, id: string, status: boolean): Promise<void> => {
    await protectedFetch<void>(CHANGE_POSTERS_STATUS_URL, token, {
        data: {posterId: id, status: status},
        method: "put"
    });
}

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

export const deletePoster = async (token: string, id: string): Promise<void> => {
    await protectedFetch<null>(`${DELETE_POSTER_URL(id)}`, token, {
        method: "delete"
    });
}

export const createPoster = async (token: string, poster: PosterCreateDto): Promise<PosterDto | string | null> => {
    const response = await protectedFetch<PosterDto | string | null>(CREATE_POSTER_URL, token, {
        data: poster,
        method: "post"
    });
    return processResponse(response);
}