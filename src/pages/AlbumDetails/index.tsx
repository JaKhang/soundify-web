import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router";
import {Album} from "@models/Album.ts";
import {Track} from "@models/Track.ts";
import albumApi from "../../api/AlbumApi.ts";
import {
    Avatar,
    Box,
    Fab, IconButton,
    Skeleton,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import ResImage from "@components/ResImage";
import {Vibrant} from "node-vibrant/browser";
import {useTranslation} from "react-i18next";
import {convertSecondsToMMSS} from "../../utils";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Links from "@components/Links";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {usePlaySelector} from "@redux/selector.ts";
import PauseIcon from '@mui/icons-material/Pause';
import {usePlayActions} from "@redux/action.ts";
import {useAppDispatch} from "@redux/store.ts";
import {PlayType} from "@features/play/musicPlaySlice.ts";
import PlayingAnimationIcon from "@components/PlayingAnimationIcon";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const Thumbnail = styled(Box)({
    aspectRatio: "1/1",
    borderRadius: "4px",
    overflow: "hidden",
    position: "relative"
})
const AlbumDetails = () => {
    const {id = ""} = useParams()
    const [album, setAlbum] = useState<Album | null>(null)
    const [tracks, setTracks] = useState<Track[]>([])
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState<string>("#fff")
    const [selected, setSelected] = useState(-1)
    const {t} = useTranslation()
    const {currentTrackIndex, trackList, playing, collectionId, shuffle} = usePlaySelector()
    const {setPlaying, playTracks, setShuffle, setCurrentIndex} = usePlayActions();
    const dispatch = useAppDispatch()
    const currentTrack = currentTrackIndex !== -1 ? trackList[currentTrackIndex] : null;
    const isCurrentAlbum = collectionId == album?.id

    useEffect(() => {
        setLoading(true)
        Promise.all([
            albumApi.getById(id),
            albumApi.getTrack(id)
        ])
            .then(([album, track]) => {
                setAlbum(album)
                setTracks(track)
                return album.images[0]
            }).then((i) => {
            Vibrant.from(i.url)
                .getPalette()
                .then((palette) => {
                    if (palette.Vibrant && palette.DarkVibrant) {
                        const startColor = palette.Vibrant.hex;
                        const endColor = palette.DarkVibrant.hex;
                        setColor(`linear-gradient(to bottom, ${startColor}, ${endColor})`);
                    }
                });
            })

            .finally(() => setLoading(false))
    }, [id]);
    if (loading) {
        // Skeleton loading state
        return (
            <Box>
                <Box sx={{ background: "#f0f0f0", padding: 4 }}>
                    <Stack direction={"row"} alignItems={"end"} gap={3}>
                        <Skeleton variant="rectangular" width="15%" height={200} />
                        <Box>
                            <Skeleton variant="text" width={100} />
                            <Skeleton variant="text" width={300} height={50} />
                            <Stack direction={"row"} alignItems={"center"} gap={2}>
                                <Skeleton variant="circular" width={30} height={30} />
                                <Skeleton variant="text" width={200} />
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
                <Box sx={{ backgroundColor: "#F9F9F9", paddingX: 6, paddingY: 6 }}>
                    <Stack marginBottom={2} alignItems="center" flexDirection="row" gap={2}>
                        <Skeleton variant="circular" width={56} height={56} />
                        <Skeleton variant="rectangular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={40} height={40} />
                    </Stack>
                    <TableContainer>
                        <Skeleton variant="rectangular" width="100%" height={400} />
                    </TableContainer>
                </Box>
            </Box>
        );
    }

    function handlePauseClick(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) {
        dispatch(setPlaying(false))

    }

    function handlePlayClick(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) {
        if (!album || !tracks) return;

        if (collectionId == album?.id) {
            dispatch(setPlaying(true))
        } else {
            dispatch(playTracks({
                shuffle: false,
                tracks: tracks,
                collectionId: album.id,
                title: album?.name,
                type: PlayType.ALBUM
            }))
        }
    }

    function handleShuffleClick() {
        if (!album || !tracks) return;

        if (isCurrentAlbum){
            dispatch(setShuffle(!shuffle))
        } else {
            dispatch(playTracks({
                shuffle: true,
                tracks: tracks,
                collectionId: album.id,
                title: album?.name,
                type: PlayType.ALBUM
            }))
        }
    }

    function trackClick(track: Track, i: number) {
        if (!album || !tracks) return;

        if (selected == i){
            if (!isCurrentAlbum){
                dispatch(playTracks({
                    shuffle: false,
                    tracks: tracks,
                    collectionId: album.id,
                    title: album?.name,
                    type: PlayType.ALBUM
                }))
            }
            dispatch(setCurrentIndex(i))

        } else {
            setSelected(i)
        }
    }

    if (album)
        return (
            <Box>
                <Box sx={{background: color}}>
                    <Stack direction={"row"} padding={4} alignItems={"end"} gap={3}>
                        <Thumbnail width={"15%"} boxShadow={3}>
                            <ResImage src={album?.images} alt={""}/>
                        </Thumbnail>

                        <Box color={theme => theme.palette.background.paper}>
                            <Typography variant="subtitle1">
                                Album
                            </Typography>
                            <Typography variant="h1" fontWeight={"bold"}>
                                {album?.name}
                            </Typography>
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                <Avatar sx={{width: "30px", height: "30px"}}>
                                    <ResImage src={album.artists[0].images} alt={""}/>
                                </Avatar>
                                <Stack direction={"row"} gap={1}>
                                    <Typography fontWeight={600}>
                                        {album.artists[0].name}
                                    </Typography>
                                    <Typography>
                                        {'\u2022'}
                                    </Typography>
                                    <Typography>
                                        {
                                            new Date(album.releaseDate).getFullYear()
                                        }
                                    </Typography>
                                    <Typography>
                                        {'\u2022'}
                                    </Typography>
                                    <Typography>
                                        {
                                            `${tracks.length} ${t("app.song")}`
                                        }
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
                <Box sx={{backgroundColor: "#F9F9F9", paddingX: 6, paddingY: 6}}>
                    <Stack marginBottom={2} alignItems="center" flexDirection="row" gap={2}>
                        <>
                            {
                                playing && isCurrentAlbum
                                ?
                                    (
                                        <Fab className="play-button"
                                             color="primary"
                                             size="large"
                                             sx={{
                                                 transition: "all 0.1s ease-in-out",
                                                 boxShadow: "unset"
                                             }}
                                             onClick={(e) => handlePauseClick(e)}
                                        >
                                            <PauseIcon fontSize="medium"/>
                                        </Fab>
                                    ) : (
                                        <Fab className="play-button"
                                             color="primary"
                                             size="large"
                                             sx={{
                                                 transition: "all 0.1s ease-in-out",
                                                 boxShadow: "unset"
                                             }}
                                             onClick={(e) => handlePlayClick(e)}
                                        >
                                            <PlayArrowIcon fontSize="medium"/>
                                        </Fab>
                                    )
                            }
                        </>
                        <IconButton onClick={() => handleShuffleClick()} color={shuffle && isCurrentAlbum ? "primary" : "default"}>
                                <ShuffleIcon fontSize="medium"/>
                        </IconButton>
                        <IconButton>
                            <FavoriteIcon fontSize="medium" sx={{color: 'error.main'}}/>
                        </IconButton>
                        <IconButton>
                            <MoreHorizIcon fontSize="medium" />
                        </IconButton>
                    </Stack>
                    <TableContainer sx={{overflow: "hidden"}}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" width="4%">#</TableCell>
                                    <TableCell >{t("label.title")}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="center" width="10%"><AccessTimeIcon
                                        fontSize={"small"}/></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tracks.map((row, i) => (
                                    <TableRow
                                        onClick={() => trackClick(row, i)}
                                        hover
                                        key={row.id}
                                        sx={{'& td, & th': {border: 0},
                                            borderRadius: 4,
                                            overflow: 'hidden',  // Ensure the border-radius is visible
                                        }}
                                        selected={selected == i}

                                    >
                                        <TableCell align="center" >
                                            {
                                                playing && currentTrack?.id == row.id ? (
                                                    <PlayingAnimationIcon width={16}/>
                                                    ) : (
                                                <Typography sx={{color: currentTrack?.id == row.id ? "primary.main" : "inherit"}}>
                                                        {i + 1}
                                                    </Typography>
                                                )
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Box width="fit-content">
                                                <Typography sx={{
                                                    "& *": {
                                                        font: "inherit",
                                                        color: "inherit",
                                                        textDecoration: "none"
                                                    },
                                                    marginBottom: 1,
                                                    "&:hover": {
                                                        textDecoration: "underline"
                                                    },
                                                    color: currentTrack?.id == row.id ? "primary.main" : "inherit"
                                                }}>
                                                    <Link to={"/"}>
                                                        {row.name}
                                                    </Link>
                                                </Typography>
                                                <Typography variant={"subtitle2"} sx={{
                                                    "& *": {
                                                        font: "inherit",
                                                        color: "inherit",
                                                        textDecoration: "none"
                                                    },
                                                    "&:hover": {
                                                        textDecoration: "underline"
                                                    },
                                                }}>
                                                    <Links items={row.artists.map(a => {
                                                        return {
                                                            label: a.name,
                                                            to: "/artists/" + a.id
                                                        }
                                                    })}/>
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align="center">{convertSecondsToMMSS(row.duration)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
            </Box>
        );
};

export default AlbumDetails;
