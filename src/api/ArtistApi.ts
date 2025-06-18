import {Track} from "@models/Track.ts";
import api from "./api.ts";
import {Artist} from "@models/Artist.ts";

class ArtistApi {
  getArtists(id: string): Promise<Artist> {
    return api.get(`/v1/catalog/artists/${id}`)
  }
  getTracks(id: string): Promise<Track[]> {
    return api.get(`/v1/catalog/artists/${id}/tracks`)
  }
}

export default new ArtistApi();
