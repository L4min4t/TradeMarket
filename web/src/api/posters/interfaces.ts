import {User} from "../interfaces/interfaces";
import {Category} from "../constants/enums";

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
}