import React, {FC, JSX} from 'react';
import {Box, Fab, Stack, styled, Typography} from "@mui/material";
import ResImage from "@components/ResImage";
import {Image} from "@models/Image.ts";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface MusicCardProps {
    image: Image[]
    title: string | JSX.Element
    id: string
    onPlayClick: (id: string) => void
    onClick: (id: string) => void
    subTitle?: string | JSX.Element

}

const Thumbnail = styled(Box)({
    aspectRatio: "1/1",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative"
})
const MusicCard: FC<MusicCardProps> = ({image, title, id, onClick, onPlayClick, subTitle}) => {

    function handlePlayClick(e: never) {
        e.stopPropagation()
        onPlayClick(id)
    }

    return (
        <Stack sx={{
            transition: "all 0.2s ease-in-out",
            borderRadius: "8px",
            "&:hover": {cursor: "pointer", backgroundColor: "rgba(255, 255, 255, 0.8)"},
            "&:hover .play-button": {opacity: 1}
        }}
               direction={"column"}
               padding={2}>
            <Thumbnail onClick={() => onClick(id)}>
                <Fab className="play-button"
                     color="primary"
                     size="medium"
                     sx={{
                         position: "absolute",
                         bottom: "5%",
                         right: "5%",
                         zIndex: 1000,
                         boxShadow: "unset",
                         opacity: 0,
                         transition: "all 0.1s ease-in-out"
                     }}
                     onClick={(e) => handlePlayClick(e)}
                >
                    <PlayArrowIcon fontSize="medium"/>
                </Fab>
                <ResImage src={image} alt={""}/>
            </Thumbnail>
            <Typography
                sx={{
                    "& *": {
                        font: "inherit",
                        color: "inherit",
                        textDecoration: "none"
                    }
                }} variant="h6" fontWeight={500} marginY={1} lineHeight={1.1}>
                {title}
            </Typography>
            <Typography
                sx={{
                    "& *": {
                        font: "inherit",
                        color: "inherit",
                        textDecoration: "none"
                    }
                }}
                variant="body1" color="textSecondary">
                {subTitle}
            </Typography>

        </Stack>
    );
};

export default MusicCard;
