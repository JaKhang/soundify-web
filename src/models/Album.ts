import {Image} from "@models/Image.ts";
import {Artist} from "@models/Artist.ts";

export interface Album{
    id: string;
    name: string;
    releaseDate: string;
    type: AlbumType;
    label: string;
    popularity: number;
    artists: Artist[];
    localeTag: string;
    notAvailableLocaleTags: string[];
    explicit: boolean;
    genres: string[];
    numberOfTracks: number;
    images: Image[];
}


export enum AlbumType {
    ALBUM = "album",
    SINGLE = "single",
    COMPILATION = "compilation"
}