import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {Box, CircularProgress, Fab, IconButton, Stack, styled, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Slider from "@components/Slider";
import ResImage from "../../components/ResImage";
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import {useLayoutSelector, usePlaySelector} from "@redux/selector.ts";
import {useAppDispatch} from "@redux/store.ts";
import {useLayoutAction, usePlayActions} from "@redux/action.ts";
import {Mode, PlayType} from "@features/play/musicPlaySlice.ts"
import Audio, {AudioAction} from "@layout/ControlBar/Audio";
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownAltIcon from '@mui/icons-material/VolumeDownAlt';
import {album, tracks} from "@models/mock.ts";
import {useTranslation} from "react-i18next";
import useDebounce from "../../hooks/useDebounce.ts";
import useDebouncedClick from "../../hooks/useDebouncedClick.ts";

const Container = styled(Box)(({theme}) => ({
    height: 100,
    backgroundColor: theme.palette.background.paper,
    gridArea: "control-bar",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    boxShadow: theme.shadows[2]
}));


enum PlayButtonState {
    PLAYING,
    PAUSED,
    LOADING,
}
const playButtonIcons = {
    [PlayButtonState.PLAYING]: <PauseIcon fontSize="medium"/>,
    [PlayButtonState.PAUSED]: <PlayArrowIcon fontSize="medium"/>,
    [PlayButtonState.LOADING]: <CircularProgress size={24}/>,
}

const modeIcons = {
    [Mode.NONE]: <RepeatIcon fontSize="medium"/>,
    [Mode.LOOP]: <RepeatIcon fontSize="medium" color="primary"/>,
    [Mode.REPEAT]: <RepeatOneIcon fontSize="medium" color="primary"/>,
}


const Thumbnail = styled(Box)(
    ({theme}) => `
        width: 64px;
        height: 64px;
        border-radius: 4px;
        overflow: hidden;
    `
)

const ControlBar = () => {
    console.log("Control bar rerender")
    const {openQueue} = useLayoutSelector();
    const {toggleQueue} = useLayoutAction();
    const {setPlaying, setShuffle, setMode, setVolume, playTracks, nextTrack, previousTrack} = usePlayActions();
    const {loading, playing, shuffle, mode, volume, currentTrackIndex, trackList} = usePlaySelector();
    const dispatch = useAppDispatch();
    const currentTrack = currentTrackIndex !== -1 ? trackList[currentTrackIndex] : null;
    const audioActionRef = useRef<AudioAction>(null);
    const {isFirstClick, handleClick} = useDebouncedClick(3000)
    const {t} = useTranslation()
    useEffect(() => {

    }, []);


    useEffect(() => {
        if (currentTrackIndex === -1) return;
        if (playing){
            document.title = `${currentTrack?.name} \u2022 ${currentTrack?.artists.map(artist => artist.name).join(', ')}`
        } else {
            document.title = t("app.title")
        }
    }, [currentTrackIndex, playing]);



    const playButtonState = useMemo(() => {
        if (loading) return PlayButtonState.LOADING;
        if (playing) return PlayButtonState.PLAYING;
        return PlayButtonState.PAUSED;
    }, [loading, playing])


    function getNextMode(current: Mode): Mode {
        switch (current) {
            case Mode.LOOP:
                return Mode.REPEAT; // If current is LOOP, next is REPEAT
            case Mode.REPEAT:
                return Mode.NONE;   // If current is REPEAT, next is NONE
            case Mode.NONE:
                return Mode.LOOP;   // If current is NONE, next is LOOP
            default:
                throw new Error("Invalid Mode"); // Handle unexpected values
        }
    }


    function handlePrevious(){
        handleClick()
        if (isFirstClick) {
            audioActionRef.current?.setDuration(0)
        } else {
            dispatch(previousTrack())
        }
    }

    if (!currentTrack) {
        return <></>
    }




    return (
        <Container>
            <Stack minWidth={'20%'} direction="row" alignItems={"center"} spacing={2}>
                <Thumbnail>
                    <ResImage src={currentTrack.album.images} alt="Descriptive alt text" />
                </Thumbnail>
                <Box minWidth={150} maxWidth={200} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>
                    <Typography fontWeight={500} variant={'h6'} lineHeight={1} mb={1} noWrap>
                        {currentTrack.name}
                    </Typography>
                    <Typography noWrap fontWeight={500} variant={"subtitle2"} lineHeight={1.2} sx={{color: 'text.secondary'}}>
                        {currentTrack.artists.map((a) => a.name).join(", ")}
                    </Typography>
                </Box>
                <Box>
                    <IconButton>
                        <FavoriteIcon fontSize="medium" sx={{color: 'error.main'}}/>
                    </IconButton>
                </Box>
            </Stack>
            <Stack flex={1} display={"flex"} direction="column" alignItems={"center"}>
                <Stack spacing={1} direction="row" justifyContent='center'  sx={{alignItems: 'center'}}>
                    <IconButton onClick={() => dispatch(setMode(getNextMode(mode)))}>
                        {modeIcons[mode]}
                    </IconButton>
                    <IconButton onClick={() => handlePrevious()} disabled={loading}>
                        <SkipPreviousIcon fontSize="medium"/>
                    </IconButton>
                    <Fab size="medium" color="primary" sx={{boxShadow: "unset"}} disabled={loading} onClick={() => dispatch(setPlaying(!playing))}>
                        {playButtonIcons[playButtonState]}
                    </Fab>
                    <IconButton onClick={() => dispatch(nextTrack())} disabled={loading}>
                        <SkipNextIcon fontSize="medium"/>
                    </IconButton>
                    <IconButton color={shuffle ? "primary" : "default"} onClick={() => dispatch(setShuffle(!shuffle))}>
                        <ShuffleIcon fontSize="medium"/>
                    </IconButton>
                </Stack>
                <Audio ref={audioActionRef}/>
            </Stack>
            <Stack minWidth={'20%'} direction="row" sx={{ alignItems: 'center'}} justifyContent={"flex-end"} spacing={1}>
                <Box>
                    <IconButton color={openQueue ? 'primary' : 'default'} onClick={() => dispatch(toggleQueue())}>
                        <QueueMusicIcon fontSize="medium"/>
                    </IconButton>
                </Box>
                <Stack  width={"120px"} direction="row" alignItems={"center"}>
                    {
                        volume !== 0 ? (
                            <IconButton onClick={() => dispatch(setVolume(0))}>
                                {volume >= 50 ? (<VolumeUpIcon fontSize="medium" />) : (<VolumeDownAltIcon fontSize="medium" />)}
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => dispatch(setVolume(100))}><VolumeOffIcon fontSize="medium" sx={{color: 'primary'}} /></IconButton>
                        )
                    }
                    <Slider size="small" value={volume} min={0} max={100} step={1} onChange={(_, value) => dispatch(setVolume(value as number))}/>
                </Stack>
            </Stack>
        </Container>
    );
};

export default memo(ControlBar);
