import {Track} from "@models/Track.ts";
import api from "./api.ts";
import {Album} from "@models/Album.ts";
import {Artist} from "@models/Artist.ts";

class SearchApi{
  getTracks(query: string): Promise<Track[]> {
    return api.get(`/v1/search/tracks?query=${query}`)
  }

  getAlbums(query: string): Promise<Album[]> {
    return api.get(`/v1/search/albums?query=${query}`)
  }

  getArtists(query: string): Promise<Artist[]> {
    return api.get(`/v1/search/artists?query=${query}`)
  }
}

export default new SearchApi();
