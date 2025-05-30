import React from 'react';
import {albums} from "@models/mock.ts";
import MusicCard from "@components/MusicCard";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router";
import {Album} from "@models/Album.ts";
import {usePlayActions} from "@redux/action.ts";
import albumApi from "../../api/AlbumApi.ts";
import {PlayType} from "@features/play/musicPlaySlice.ts";
import {useAppDispatch} from "@redux/index.ts";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const Home = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const {playTracks} = usePlayActions();

    function handlePlay(a: Album) {
        albumApi.getTrack(a.id)
            .then((tracks) => {
                dispatch(playTracks({
                    shuffle: false,
                    tracks,
                    type: PlayType.ALBUM,
                    title: a.name
                }))
            })
    }



    return (
        <Box paddingY={2}>
            <Box paddingX={4} position="relative">
                <Typography variant="h5" fontWeight={"bolder"} marginBottom={1} paddingX={1}>
                    {t("section.trending")}
                </Typography>
                <Swiper
                    slidesPerView={5}
                    modules={[Navigation, Pagination]}
                >
                        {albums.map(a => (
                                <SwiperSlide>
                                    <MusicCard

                                        subTitle={
                                         <>
                                             {a.artists.map(value => <Link to={`/artist/${a.id}`}>{value.name}</Link>)}
                                         </>
                                        }
                                               image={a.images}
                                               title={a.name}
                                               id={a.id}
                                               onClick={() => navigate(`/albums/${a.id}`)}
                                               onPlayClick={() => handlePlay(a)}/>
                                </SwiperSlide>

                        ))}

                </Swiper>
            </Box>
        </Box>
    );
};

export default Home;
