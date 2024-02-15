import {User} from "../user/interfaces";

export interface City {
    id: string;
    name: string;
    region: string;
    status: string;
    users: User[];
}