import {City} from "../city/interfaces";

export interface User {
    id: string;
    name: string;
    avatarId: string;
    email: string;
    phone: string;
    telegram: string;
    cityId: string;
    city: City;
}

export interface UserUpdateDto {
    id: string;
    name: string;
    avatarId?: string;
    email: string;
    phone: string;
    telegram: string;
    cityId: string;
}