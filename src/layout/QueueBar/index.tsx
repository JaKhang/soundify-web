import React, {useMemo} from 'react';
import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    styled,
    Typography
} from "@mui/material";

import {useLayoutSelector, usePlaySelector} from "@redux/selector.ts";
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useLayoutAction, usePlayActions} from "@redux/action.ts";
import {useAppDispatch} from "@redux/store.ts";
import {useTranslation} from "react-i18next";
import ResImage from "@components/ResImage";
import {createArrayWithValue, getSubArrayAfterNumber} from "../../utils";
import {Mode} from '@features/play/musicPlaySlice';
import {TransitionGroup} from 'react-transition-group';
import {Track} from "@models/Track.ts";

const Container = styled(Box)(({theme}) => ({
    width: 400,
    backgroundColor: theme.palette.background.paper,
    gridArea: "queue-bar",
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

}));

const QueueBar = () => {
    const {openQueue} = useLayoutSelector()
    const {toggleQueue} = useLayoutAction()
    const {currentTrackIndex, trackList, queue, mode, shuffle} = usePlaySelector()
    const {setCurrentIndex} = usePlayActions();
    const dispatch = useAppDispatch();
    const currentTrack = currentTrackIndex != -1 ? trackList[currentTrackIndex] : null;
    const queueTrack = useMemo(() => {
        switch (mode) {
            case Mode.REPEAT:
                return createArrayWithValue(10, currentTrackIndex).map(index => trackList[index]);
            case Mode.LOOP:
                const tmp = getSubArrayAfterNumber(queue, currentTrackIndex);
                return [...tmp, ...queue].map(index => trackList[index]);
            default:
                return getSubArrayAfterNumber(queue, currentTrackIndex).map(index => trackList[index]);
        }
    }, [queue, currentTrackIndex, mode, shuffle])

    const handleItemClick = (track: Track ) =>{
        let i = trackList.indexOf(track)
        dispatch(setCurrentIndex(i))
    }


    const {t} = useTranslation()
    return (
        openQueue &&
        <Container>
            <Box sx={{padding: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h6" fontWeight={600} fontSize={16}>{t('queue.title')}</Typography>
                <IconButton size="small" onClick={() => dispatch(toggleQueue())}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Box flex={1} overflow="auto" height="100%">
                <Box overflow="auto">
                    <Box sx={{padding: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant="h6" fontWeight={600} fontSize={16}>{t('queue.playing')}</Typography>
                    </Box>
                    <List sx={{bgcolor: 'background.paper'}}>
                        <ListItem
                            disablePadding
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <MoreHorizIcon/>
                                </IconButton>
                            }>
                            <ListItemButton dense sx={{borderRadius: "4px"}} selected>
                                <ListItemAvatar>
                                    <Box width={40} height={40} overflow="hidden" borderRadius="4px">
                                        <ResImage src={currentTrack?.album.images || []} alt={''}/>
                                    </Box>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{'& .MuiListItemText-primary': {color: 'primary.main', fontSize: 18}}}
                                    color={"primary"}
                                    slotProps={{
                                        primary: {noWrap: true},
                                        secondary: {noWrap: true}
                                    }}
                                    primary={currentTrack?.name}

                                    secondary={currentTrack?.artists.map(artist => artist.name).join(', ')}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Box sx={{padding: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant="h6" fontWeight={600} fontSize={16}>{t('queue.next')}</Typography>

                    </Box>
                    <List sx={{bgcolor: 'background.paper'}}>
                        <TransitionGroup>
                            {queueTrack.map((track, index) => (
                                <Collapse key={track.id} in={false} unmountOnExit>
                                    <ListItem
                                        key={index}
                                        disablePadding
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments">
                                                <MoreHorizIcon/>
                                            </IconButton>
                                        }>
                                        <ListItemButton onClick={() => handleItemClick(track)} dense sx={{borderRadius: "4px"}}>
                                            <ListItemAvatar>
                                                <Box width={40} height={40} overflow="hidden" borderRadius="4px">
                                                    <ResImage src={track?.album.images || []} alt={''}/>
                                                </Box>
                                            </ListItemAvatar>
                                            <ListItemText
                                                sx={{'& .MuiListItemText-primary': {fontSize: 18}}}
                                                color={"primary"}
                                                primary={track?.name}
                                                slotProps={{
                                                    primary: {noWrap: true},
                                                    secondary: {noWrap: true}
                                                }}
                                                secondary={track?.artists.map(artist => artist.name).join(', ')}/>
                                        </ListItemButton>
                                    </ListItem>
                                </Collapse>

                            ))}
                        </TransitionGroup>

                    </List>
                </Box>
            </Box>

        </Container>
    );
};

export default QueueBar;
