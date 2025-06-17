import {Album} from "@models/Album.ts";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SearchAlbumCard from "./SearchAlbumCard";

interface SearchAlbumProps {
  albums: Album[]
}

const SearchAlbum = ({albums}: SearchAlbumProps) => {
  const navigate = useNavigate();

  const onAlbumClick = (albumId: string) => {
    navigate(`/albums/${albumId}`);
  }

  return (
    <Grid container spacing={2}>
      {albums.map((album) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={album.id} component="div">
          <SearchAlbumCard
            album={album}
            onAlbumClick={onAlbumClick}
          />
        </Grid>
      ))}
    </Grid>
  )
};

export default SearchAlbum;
