import {Album} from "@models/Album";
import {Box, CardMedia, Stack, styled, Typography} from "@mui/material";
import ResImage from "@components/ResImage";
import React from "react";

interface SearchAlbumCardProps {
  album: Album,
  onAlbumClick: (albumId: string) => void
}

const Thumbnail = styled(Box)({
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative"
})

const SearchAlbumCard =  ({album, onAlbumClick}: SearchAlbumCardProps) => {
  const toYear = (releaseDate: string) => {
    return releaseDate.substring(0, 4);
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
      <Thumbnail onClick={() => onAlbumClick(album.id)}>
        <CardMedia
          component="img"
          image={album.images[0].url}
          alt="Image"
          sx={{
            width: 200,
            height: 200,
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Thumbnail>
      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '200px'
        }} variant="h6" fontWeight={500} marginY={1} lineHeight={1.1}>
        {album.name}
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
        {toYear(album.releaseDate)}
      </Typography>

    </Stack>
  );
};

export default SearchAlbumCard;
