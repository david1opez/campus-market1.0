import { DocumentData } from '@firebase/firestore-types';

export type UserTypeType = "student"|"business"|"client"|"none";

export interface UserType {
    id: string,
    type: UserTypeType,
    showAds: boolean
}

export type CategoryType = "todos" | "regalos" | "comida" | "ropa" | "cuidado personal" | "otros"

export interface PromotedPostType {
    active: boolean | null;
    title: string;
    description: string;
    image: string;
    id: string
}

export type PostType = {
    active: boolean;
    title: string;
    description: string;
    images: string[];
    id: string;
    category: CategoryType;
}

export interface SearchBarProps {
    searchValue: (value: string) => void,
    onFocus: () => void,
    onBlur: () => void
}

export interface CategoryProps {
    name: string,
    activeCategory: CategoryType | string,
    onPress: () => void
}