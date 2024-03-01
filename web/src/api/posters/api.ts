import {protectedFetch} from "../common/http";
import {processResponse} from "../common";

import {PosterCreateDto, PosterDto, PosterPreviewDto} from "./interfaces";

import {
    CHANGE_POSTERS_STATUS_URL,
    CREATE_POSTER_URL,
    DELETE_POSTER_URL,
    LIKE_POSTER_URL,
    LIKED_POSTERS_URL,
    MODERATE_POSTER_URL,
    POSTER_BY_ID_URL,
    POSTERS_TO_MODERATE_URL,
    PUBLISHED_POSTERS_URL,
    UPDATE_POSTER_URL,
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
export const getPostersToModerate = async (token: string): Promise<PosterDto[] | null> => {
    const response = await protectedFetch<PosterDto[]>(POSTERS_TO_MODERATE_URL, token, {
        method: "get"
    });
    return processResponse(response);
};

export const moderatePoster = async (token: string, id: string, result: boolean, isActive: boolean): Promise<PosterDto[] | null> => {
    const response = await protectedFetch<PosterDto[]>(MODERATE_POSTER_URL, token, {
        method: "put",
        data: {
            posterId: id,
            moderateResult: result,
            isActivated: isActive
        }
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

export const deletePoster = async (token: string, id: string): Promise<string | null> => {
    const result = await protectedFetch<string | null>(`${DELETE_POSTER_URL(id)}`, token, {
        method: "delete"
    });
    return processResponse(result);
}

export const createPoster = async (token: string, poster: PosterCreateDto): Promise<PosterDto | null> => {
    const response = await protectedFetch<PosterDto | null>(CREATE_POSTER_URL, token, {
        data: poster,
        method: "post"
    });
    return processResponse(response);
}

export const updatePoster = async (token: string, poster: PosterCreateDto): Promise<PosterDto | null> => {
    const response = await protectedFetch<PosterDto | null>(UPDATE_POSTER_URL, token, {
        data: poster,
        method: "put"
    });
    return processResponse(response);
}