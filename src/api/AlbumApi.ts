import {Track} from "@models/Track.ts";
import api from "./api.ts";
import {Album} from "@models/Album.ts";

class AlbumApi{
    getTrack(id: string): Promise<Track[]> {
        return api.get(`/v1/catalog/albums/${id}/tracks`)
    }

    getAlbumsByIds(ids: string[]): Promise<Album[]> {
        return api.get("/v1/catalog/albums", {
            params: {
                ids: ids.join(", ")
            }
        })
    }

    getById(id: string) {
        return api.get<Album>(`/v1/catalog/albums/${id}`)

    }
}

export default new AlbumApi();