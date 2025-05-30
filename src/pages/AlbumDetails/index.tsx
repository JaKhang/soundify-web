import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Album} from "@models/Album.ts";
import {Track} from "@models/Track.ts";
import albumApi from "../../api/AlbumApi.ts";
import {Box, Stack, styled, Typography} from "@mui/material";
import ResImage from "@components/ResImage";
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

    useEffect(() => {
        setLoading(true)
        Promise.all([
            albumApi.getById(id),
            albumApi.getTrack(id)
        ])
            .then(([album, track]) => {
                console.log(album)
                console.log(track)
                setAlbum(album)
                setTracks(track)
            })
            .finally(() => setLoading(false))
    }, [id]);
    if (loading)
        return <Box>Loading</Box>


    if (album)
        return (
            <Box>
                <Stack direction={"row"} padding={4} alignItems={"end"} gap={2}>
                    <Thumbnail width={"15%"} boxShadow={3}>
                        <ResImage src={album?.images} alt={""}/>
                    </Thumbnail>
                    <Box>
                        <Typography variant="h1" fontWeight={"bold"}>
                            {album?.name}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        );
};

export default AlbumDetails;
