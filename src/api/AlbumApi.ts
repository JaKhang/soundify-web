import {Track} from "@models/Track.ts";
import {tracks} from "@models/mock.ts";

class AlbumApi{
    getTrack(id: string): Promise<Track[]> {
        return new Promise((resolve) => {
            resolve(tracks)
        })
    }
}

export default new AlbumApi();