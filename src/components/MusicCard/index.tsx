import React, {FC, JSX} from 'react';
import {Box, Slider as MUISlider, Stack, styled, Typography} from "@mui/material";
import ResImage from "@components/ResImage";
import {Image} from "@models/Image.ts";

interface MusicCardProps{
    image: Image[]
    title: string | JSX.Element
    id: string
    onPlayClick?: (id: string) => void
    onClick: (id: string) => void
    subTitle?: string | JSX.Element

}
const Thumbnail = styled(Box)({
    aspectRatio: "1/1",
    borderRadius: "8px",
    overflow: "hidden"
})
const MusicCard: FC<MusicCardProps> = ({image, title, id, onClick, onPlayClick, subTitle}) => {
    return (
        <Stack direction={"column"} onClick={() => onPlayClick(id)} padding={1}>
            <Thumbnail>
                <ResImage src={image} alt={title}/>
            </Thumbnail>
            <Typography variant="h6" fontWeight={500} marginY   ={1} lineHeight={1.1}>
                {title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                {subTitle}
            </Typography>

        </Stack>
    );
};

export default MusicCard;
