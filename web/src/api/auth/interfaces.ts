export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Jwts {
    accessToken: string;
    refreshToken: string;
}