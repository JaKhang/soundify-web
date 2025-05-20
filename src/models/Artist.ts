import {Image} from "@models/Image.ts";

export interface Artist {
    id: string;
    name: string;
    images: Image[];
    genres: string[];
    popularity: number;
    followers: number;
    localeTag: string;
}