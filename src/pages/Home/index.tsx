import React, {useEffect, useState} from 'react';
import {albums} from "@models/mock.ts";
import MusicCard from "@components/MusicCard";
import {Box, Skeleton, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {Album} from "@models/Album.ts";
import {usePlayActions} from "@redux/action.ts";
import albumApi from "../../api/AlbumApi.ts";
import {PlayType} from "@features/play/musicPlaySlice.ts";
import {useAppDispatch} from "@redux/store.ts";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import Grid from '@mui/material/Grid';
import "swiper/css";
import "swiper/css/navigation";
import Links from "@components/Links";

const Home = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const {playTracks} = usePlayActions();
    const [loading, setLoading] = useState(false)
    const [trendingAlbum, setTrendingAlbum] = useState<Album[]>([])
    const [forYouAlbum, setForYouAlbum] = useState<Album[]>([])

    function handlePlay(a: Album) {
        albumApi.getTrack(a.id)
            .then((tracks) => {
                dispatch(playTracks({
                    shuffle: false,
                    tracks,
                    type: PlayType.ALBUM,
                    title: a.name,
                    collectionId: a.id
                }))
            })
    }

    function handleItemClick(a: Album) {
        navigate(`/albums/${a.id}`)
    }



    useEffect(() => {
        setLoading(true)
        albumApi.getAlbumsByIds(['01JXVZJPVHNXDKT7VSTB3VC2KD','01JQGWFQF6P011MHS4V09YGK1J', '01JQGWFVD0Z4NRGHW8WKSEZ4W7', '01JQGWFYBWN4SWCPFR5VV8WE06', '01JQGWG2SHWK0TV451990689KP', '01JQGWGHFXFGHKZM6F5M3WXKF2'])
            .then((albums) => setTrendingAlbum(albums))
            .then((  () => setForYouAlbum(albums)))
            .finally(() => setLoading(false))
    }, []);

    if (loading)

        return (
            <Box paddingY={2}>
                <Box paddingX={4} marginBottom={3   }>
                    <Box marginX={1} marginBottom={2}>
                        <Skeleton sx={{ms: 1}} width="20%" height={30}/>
                    </Box>
                    <Grid container wrap="nowrap" >
                        {( Array.from(new Array(5)).map((item, index) => (
                            <Box key={index} sx={{ width: "100%",  padding: 1 }}>
                                <Box sx={{ width: '100%', paddingTop: '100%', position: 'relative', marginBottom: 2}}>
                                    <Skeleton
                                        variant="rounded"
                                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    />
                                </Box>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        )))}
                    </Grid>
                </Box>

                <Box paddingX={5} >
                    <Box marginX={1} marginBottom={2}>
                        <Skeleton sx={{ms: 1}} width="20%" height={30}/>
                    </Box>
                    <Grid container wrap="nowrap" >
                        {( Array.from(new Array(6)).map((item, index) => (
                            <Box key={index} sx={{ width: "100%",  padding: 1 }}>
                                <Box sx={{ width: '100%', paddingTop: '100%', position: 'relative', marginBottom: 2}}>
                                    <Skeleton
                                        variant="rounded"
                                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    />
                                </Box>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        )))}
                    </Grid>
                </Box>
            </Box>
        )


    return (
        <Box paddingY={2} >
            <Box paddingX={4} position="relative" marginBottom={5}>
                <Typography variant="h5" fontWeight={"bolder"} marginBottom={1} paddingX={1}>
                    {t("section.trending")}
                </Typography>
                <Swiper
                    slidesPerView={5}
                    modules={[Navigation, Pagination]}
                >
                        {trendingAlbum.map(a => (
                                <SwiperSlide>
                                    <MusicCard

                                        subTitle={<Links items={
                                            a.artists.map(a => {
                                                return {label: a.name, to: "/artists/" + a.id}
                                            })
                                        }/>}
                                               image={a.images}
                                               title={a.name}
                                               id={a.id}
                                               onClick={() => handleItemClick(a)}
                                               onPlayClick={() => handlePlay(a)}/>
                                </SwiperSlide>

                        ))}

                </Swiper>
            </Box>

            <Box paddingX={4} position="relative">
                <Typography variant="h5" fontWeight={"bolder"} marginBottom={1} paddingX={1}>
                    {t("section.foryou")}
                </Typography>
                <Swiper
                    slidesPerView={5}
                    modules={[Navigation, Pagination]}
                >
                    {forYouAlbum.map(a => (
                        <SwiperSlide>
                            <MusicCard

                                subTitle={<Links items={
                                    a.artists.map(a => {
                                        return {label: a.name, to: "/artists/" + a.id}
                                    })
                                }/>}
                                image={a.images}
                                title={a.name}
                                id={a.id}
                                onClick={() => handleItemClick(a)}
                                onPlayClick={() => handlePlay(a)}/>
                        </SwiperSlide>

                    ))}

                </Swiper>
            </Box>
        </Box>
    );
};

export default Home;
