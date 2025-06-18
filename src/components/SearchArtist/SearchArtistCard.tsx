import {Box, CardMedia, Stack, styled, Typography} from "@mui/material";
import React from "react";
import {Artist} from "@models/Artist.ts";
import {useTranslation} from "react-i18next";

interface SearchArtistCardProps {
  artist: Artist
  onArtistClick: (artistId: string) => void
}

const Thumbnail = styled(Box)({
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative"
})

const SearchArtistCard =  ({artist, onArtistClick}: SearchArtistCardProps) => {
  const {t} = useTranslation();

  return (
    <Stack sx={{
      transition: "all 0.2s ease-in-out",
      borderRadius: "8px",
      "&:hover": {cursor: "pointer", backgroundColor: "rgba(255, 255, 255, 0.8)"},
      "&:hover .play-button": {opacity: 1}
    }}
           direction={"column"}
           padding={2}>
      <Thumbnail onClick={() => onArtistClick(artist.id)}>
        <CardMedia
          component="img"
          image={artist.images[0].url}
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
        {artist.name}
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
        {artist.followers} {t("common.followers")}
      </Typography>

    </Stack>
  );
};

export default SearchArtistCard;
