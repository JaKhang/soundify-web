import {Artist} from "@models/Artist.ts";
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import SearchArtistCard from "@components/SearchArtist/SearchArtistCard.tsx";

interface SearchArtistProps {
  artists: Artist[]
}

const SearchArtist = ({artists}: SearchArtistProps) => {
  const navigate = useNavigate();

  const onArtistClick = (artistId: string) => {
    navigate(`/artists/${artistId}`);
  }

  return (
    <Grid container spacing={2}>
      {artists.map((artist) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={artist.id} component="div">
          <SearchArtistCard
            artist={artist}
            onArtistClick={onArtistClick}
          />
        </Grid>
      ))}
    </Grid>
  )
};

export default SearchArtist;
