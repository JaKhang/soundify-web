import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Track} from "@models/Track.ts";
import {createArray, createShuffleArray} from "../../utils";

interface MusicPlayState {
    loading: boolean
    playing: boolean
    mode: Mode,
    shuffle: boolean,
    volume: number,
    type: PlayType,
    title?: string,
    trackList: Track[],
    currentTrackIndex: number,
    queue: number[],
}

export enum Mode {
    LOOP,
    REPEAT,
    NONE
}

export enum PlayType{
    ALBUM,
    SONG,
    PLAYLIST,
    SEARCH,
}

const initialState: MusicPlayState = {
    loading: false,
    mode: Mode.NONE,
    playing: false,
    shuffle: false,
    volume: 100,
    type: PlayType.SONG,
    trackList: [],
    currentTrackIndex: -1,
    queue: []
};




const musicPlaySlice = createSlice({
    name: "play",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>){
            state.loading = action.payload
        },

        setPlaying(state, action: PayloadAction<boolean>){
            state.playing = action.payload
        },
        setShuffle(state, action: PayloadAction<boolean>){
            state.shuffle = action.payload
            if (!action.payload){
                state.queue = createArray(state.trackList.length)
            } else {
                state.queue = createShuffleArray(state.trackList.length, state.currentTrackIndex);
            }
        },
        setMode(state, action: PayloadAction<Mode>){
            state.mode = action.payload
        },
        setVolume(state, action: PayloadAction<number>){
            state.volume = action.payload
        },
        playTracks(state, action: PayloadAction<{
            tracks: Track[],
            shuffle?: boolean,
            type: PlayType,
            title?: string,
        }>){
            state.trackList = action.payload.tracks
            state.currentTrackIndex = 0
            state.type = action.payload.type
            state.playing = true
            state.shuffle = action.payload.shuffle || false
            state.title = action.payload.title || ""
            if (!action.payload.shuffle){
                state.queue = createArray(action.payload.tracks.length)
            } else {
                state.queue = createShuffleArray(action.payload.tracks.length, state.currentTrackIndex);
            }

        },
        nextTrack(state){
            let i = state.queue.indexOf(state.currentTrackIndex) + 1;
            if (i >= state.queue.length){
                i = 0;
            }
            state.currentTrackIndex = state.queue[i]
        },
        previousTrack(state){
            let i = state.queue.indexOf(state.currentTrackIndex) - 1;
            if (i < 0){
                i = state.queue.length - 1;
            }
            state.currentTrackIndex = state.queue[i]
        }



    }
});

export default musicPlaySlice;

