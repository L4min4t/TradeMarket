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

export interface City {
    id: string; 
    name: string;
    region: string;
    status: string;
    users: User[];
}