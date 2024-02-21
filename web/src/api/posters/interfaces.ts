import {Category} from "../constants/enums";
import {User} from "../user/interfaces";

export interface PosterPreviewDto {
    id: string;
    title: string;
    description: string;
    price: bigint;
    isNew: boolean;
    imageId: string;
    creatorId: string;
    creator: User;
    publishedAt: Date;
    numberViewed: number;
    category: Category;

    isLiked: boolean;
}

export interface PosterDto {
    id: string;
    title: string;
    description: string;
    price: number;
    isSharing: boolean;
    isNew: boolean;
    imageId?: string;
    isActive: boolean;
    isModerated: boolean;
    creatorId: string;
    creator: User;
    createdAt: Date;
    publishedAt: Date;
    numberViewed: number;
    numberLiked: number;
    category: Category;
}

export interface PosterCreateDto {
    title: string;
    description: string;
    price: number;
    isSharing: boolean;
    isNew: boolean;
    imageId: string;
    creatorId: string;
    category: Category;
}