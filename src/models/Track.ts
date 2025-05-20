import {Artist} from "@models/Artist.ts";
import {Album} from "@models/Album.ts";

export interface Track {
    id: string;
    name: string;
    duration: number; // Duration in milliseconds
    explicit: boolean;
    playable: boolean;
    popularity: number;
    album: Album;
    artists: Artist[];
    genres: string[];
    index: number;
}