﻿const BASE_URL = process.env.REACT_APP_BASE_URL || "";

const PUBLISHED_POSTERS_URL = `${BASE_URL}/Poster/published`;
const USER_POSTERS_URL = `${BASE_URL}/Poster/user`;
const POSTERS_TO_MODERATE_URL = `${BASE_URL}/Poster/to-moderate`;
const MODERATE_POSTER_URL = `${BASE_URL}/Poster/moderate`;
const CHANGE_POSTERS_STATUS_URL = `${BASE_URL}/Poster/change-status`;
const LIKE_POSTER_URL = (id: string): string => `${BASE_URL}/Poster/like/${id}`;
const VIEW_POSTER_URL = (id: string): string => `${BASE_URL}/Poster/view/${id}`;
const DELETE_POSTER_URL = (id: string): string => `${BASE_URL}/Poster/${id}`;
const POSTER_BY_ID_URL = (id: string): string => `${BASE_URL}/Poster/${id}`;
const LIKED_POSTERS_URL = (id: string): string => `${BASE_URL}/Poster/liked/${id}`;

const CREATE_POSTER_URL = `${BASE_URL}/Poster`;
const UPDATE_POSTER_URL = `${BASE_URL}/Poster`;

export {
    PUBLISHED_POSTERS_URL,
    USER_POSTERS_URL,
    POSTERS_TO_MODERATE_URL,
    MODERATE_POSTER_URL,
    CHANGE_POSTERS_STATUS_URL,
    LIKE_POSTER_URL,
    VIEW_POSTER_URL,
    DELETE_POSTER_URL,
    POSTER_BY_ID_URL,
    LIKED_POSTERS_URL,
    CREATE_POSTER_URL,
    UPDATE_POSTER_URL
};