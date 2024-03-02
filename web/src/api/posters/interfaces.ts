import {Category} from "../constants/enums";
import {User} from "../user/interfaces";

export interface PosterDto {
    id: string;
    title: string;
    description: string;
    price: number;
    isSharing: boolean;
    isNew: boolean;
    imageId: string;
    isActive: boolean;
    isModerated: boolean;
    creatorId: string;
    creator: User;
    createdAt: Date;
    publishedAt: Date;
    numberViewed: number;
    numberLiked: number;
    category: Category;

    isLiked?: boolean;
}


export interface PosterCreateUpdateDto {
    title: string;
    description: string;
    price: number;
    isSharing: boolean;
    isNew: boolean;
    imageId: string;
    creatorId: string;
    category: Category;
}