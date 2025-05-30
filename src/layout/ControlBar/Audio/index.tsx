import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Stack, Typography} from "@mui/material";
import Slider from "@components/Slider";
import Hls from "hls.js";
import {usePlaySelector} from "@redux/selector.ts";
import {useAppDispatch} from "@redux/store.ts";
import {usePlayActions} from "@redux/action.ts";
import { Mode } from '@features/play/musicPlaySlice';
import streamingApi from "@features/play/streamingApi.ts";
import {convertSecondsToMMSS} from "../../../utils";

export interface AudioAction {
    setDuration: (duration: number) => void;
}

export type AudioProps = object

const Audio = forwardRef<AudioAction, AudioProps>((props, ref)=> {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [time, setTime] = useState(0)
    const [src, setSrc] = useState("")
    const [changing, setChanging] = useState(false)
    const {setLoading, setPlaying, nextTrack} = usePlayActions()
    const {loading, playing, mode, volume, currentTrackIndex, trackList, queue} = usePlaySelector()

    const dispatch = useAppDispatch();

    const currentTrack = currentTrackIndex !== -1 ? trackList[currentTrackIndex] : null;

    useEffect(() => {
        if (currentTrack){
            dispatch(setLoading(true))
            setSrc("")
            streamingApi.getStreamingUrl()
                .then((url) => setSrc(url))
                .catch(() => {
                    dispatch(setPlaying(false))
                })
        }
    }, [currentTrack?.id]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || loading) return;
        if (playing){
            audio.play()
        } else {
            audio.pause()
        }
    }, [playing, loading]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (mode == Mode.REPEAT){
            audio.loop = true
        } else {
            audio.loop = false;
        }
    }, [mode]);

    useEffect(() => {
        if (src){
            const audio = audioRef.current;
            const hls = new Hls()
            if (Hls.isSupported() && audio) {
                hls.loadSource(src);
                hls.attachMedia(audio);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (playing) audio.play();
                    dispatch(setLoading(false))
                });


                return () => {
                    hls.destroy();
                };
            }
        }
    }, [src]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume / 100;
    }, [volume]);

    useImperativeHandle(ref, () => ({
        setDuration: (duration: number) => {
            changeAudioTagTime(duration)
        },
    }))

    function calculateTime() {
        return (audioRef.current?.currentTime ?? 0) * 100 / (audioRef.current?.duration ?? 1);
    }

    function changeAudioTagTime(value: number) {
        if (audioRef.current) {
            audioRef.current.currentTime = (value as number) * (audioRef.current.duration ?? 1) / 100;
        }
    }


    function handleEnded() {
        if (mode == Mode.REPEAT){
            return
        } else  if (mode == Mode.NONE ) {
            const index = queue.indexOf(currentTrackIndex);
            if (index === queue.length - 1)
                return;
        }
        dispatch(nextTrack())
        dispatch(setPlaying(true))
    }

    return (
        <Stack spacing={2} direction="row" width={"65%"} sx={{alignItems: 'center'}}>
            <Typography variant={"caption"} fontSize={14} lineHeight={1}>{convertSecondsToMMSS(audioRef.current?.currentTime ??0)}</Typography>
            <Slider
                size="small"
                value={time}
                onChange={(_, value) => setTime(value as number)}
                onChangeCommitted={(e, value) => {
                    setChanging(false)
                    changeAudioTagTime(value as number)
                }}
                onMouseDown={() => setChanging(true)}
                onBlur={() => setChanging(false)}
                min={0}
                step={1}
                max={100}
            />
            <Typography variant={"caption"} fontSize={14} lineHeight={1}>{convertSecondsToMMSS(audioRef.current?.duration)}</Typography>
            <audio onPlay={() => setPlaying(true)} onPause={() => dispatch(setPlaying(false))} ref={audioRef} preload="metadata" onTimeUpdate={() =>{ if (!changing) setTime(calculateTime())}} onEnded={handleEnded}/>
        </Stack>

    );
})

export default Audio;
