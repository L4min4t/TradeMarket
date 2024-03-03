import {processResponse, protectedFetch} from "../common";

import {PosterCreateUpdateDto, PosterDto} from "./interfaces";

import {
    CHANGE_POSTERS_STATUS_URL,
    CREATE_POSTER_URL,
    DELETE_POSTER_URL,
    GET_LIKED_POSTERS_URL,
    GET_POSTER_BY_ID_URL,
    GET_POSTERS_TO_MODERATE_URL,
    GET_PUBLISHED_POSTERS_URL,
    GET_USER_POSTERS_URL,
    LIKE_POSTER_URL,
    MODERATE_POSTER_URL,
    UPDATE_POSTER_URL,
    VIEW_POSTER_URL
} from "./urls";

export const getPublishedPosters = async (token: string): Promise<PosterDto[] | null> => {
    const response = await protectedFetch<PosterDto[]>(GET_PUBLISHED_POSTERS_URL, token, {
        method: "get"
    });
    return processResponse(response);
};

export const getUserPosters = async (token: string): Promise<PosterDto[] | null> => {
    const response = await protectedFetch<PosterDto[]>(GET_USER_POSTERS_URL, token, {
        method: "get"
    });
    return processResponse(response);
};
export const getPostersToModerate = async (token: string): Promise<PosterDto[] | null> => {
    const response = await protectedFetch<PosterDto[]>(GET_POSTERS_TO_MODERATE_URL, token, {
        method: "get"
    });
    return processResponse(response);
};

export const moderatePoster = async (token: string, id: string, result: boolean, isActive: boolean): Promise<string | null> => {
    const response = await protectedFetch<string>(MODERATE_POSTER_URL, token, {
        method: "put",
        data: {
            posterId: id,
            moderateResult: result,
            isActivated: isActive
        }
    });
    return processResponse(response);
};

export const changePosterStatus = async (token: string, id: string, status: boolean): Promise<string | null> => {
    const response = await protectedFetch<string>(CHANGE_POSTERS_STATUS_URL, token, {
        data: {posterId: id, status: status},
        method: "put"
    });

    return processResponse(response);
}

export const getPoster = async (token: string, id: string): Promise<PosterDto | null> => {
    const response = await protectedFetch<PosterDto>(`${GET_POSTER_BY_ID_URL(id)}`, token, {
        method: "get"
    });

    return processResponse(response);
}

export const getLikedPosters = async (token: string, id: string): Promise<PosterDto[] | null> => {
    const response = await protectedFetch<PosterDto[]>(`${GET_LIKED_POSTERS_URL(id)}`, token, {
        method: "get"
    });

    return processResponse(response);
}

export const likePoster = async (id: string, token: string): Promise<string | null> => {
    const response = await protectedFetch<string>(`${LIKE_POSTER_URL(id)}`, token, {
        method: "put"
    });

    return processResponse(response);
};

export const viewPoster = async (token: string, id: string): Promise<string | null> => {
    const response = await protectedFetch<string>(`${VIEW_POSTER_URL(id)}`, token, {
        method: "put"
    });

    return processResponse(response);
}

export const deletePoster = async (token: string, id: string): Promise<string | null> => {
    const result = await protectedFetch<string | null>(`${DELETE_POSTER_URL(id)}`, token, {
        method: "delete"
    });
    return processResponse(result);
}

export const createPoster = async (token: string, poster: PosterCreateUpdateDto): Promise<string | null> => {
    const response = await protectedFetch<string | null>(CREATE_POSTER_URL, token, {
        data: poster,
        method: "post"
    });
    return processResponse(response);
}

export const updatePoster = async (token: string, poster: PosterCreateUpdateDto): Promise<string | null> => {
    const response = await protectedFetch<string | null>(UPDATE_POSTER_URL, token, {
        data: poster,
        method: "put"
    });
    return processResponse(response);
}