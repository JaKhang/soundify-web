import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {Box, CircularProgress, Tab, Tabs} from "@mui/material";
import searchApi from "../../api/SearchApi.ts";
import React, {useEffect, useRef, useState} from "react";
import {Track} from "@models/Track.ts";
import {Album} from "@models/Album.ts";
import {Artist} from "@models/Artist.ts";
import SearchTrackTable from "@components/SearchTrackTable";
import SearchAlbum from "@components/SearchAlbum/SearchAlbum.tsx";

const Search = () => {
  const {t} = useTranslation();
  const location = useLocation();
  const query: string = location.state;
  const [searchResults, setSearchResults] = useState<Track[] | Album[] | Artist[]>([]);
  const criteriaRef = useRef<string>("tracks");
  const [criteria, setCriteria] = useState<string>("tracks");
  const [loading, setLoading] = useState<boolean>(false);

  const searchTabs = [
    {value: "tracks", label: "Songs"},
    {value: "albums", label: "Albums"},
    {value: "artists", label: "Artists"},
  ];

  useEffect(() => {
    if (query) {
      performSearch(query, criteriaRef.current);
    }
  }, [query]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    criteriaRef.current = newValue;
    setCriteria(newValue);
    setSearchResults([]);
    if (query) {
      performSearch(query, newValue);
    }
  };

  const performSearch = async (searchQuery: string, searchCriteria: string) => {
    setLoading(true);
    try {
      let results;

      switch (searchCriteria) {
        case "tracks":
          results = await searchApi.getTracks(searchQuery);
          break;

        case "albums":
          results = await searchApi.getAlbums(searchQuery);
          break;

        case "artists":
          results = await searchApi.getArtists(searchQuery);
          break;

        default:
          results = await searchApi.getTracks(searchQuery);
          break;
      }
      console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding={2}>
      <h1>Tìm kiếm</h1>
      {/* ✅ Navigation Tabs */}
      <Box sx={{ mb: 3, ml: 3 }}>
        <Tabs
          value={criteria}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              minWidth: 'auto',
              fontWeight: 500,
              fontSize: '14px',
              color: 'black',
              '&.Mui-selected': {
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0)',
                borderRadius: '50px'
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none' // Hide default indicator
            }
          }}
        >
          {searchTabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
            />
          ))}
        </Tabs>
      </Box>
      {
        criteria === "tracks" && (
          <SearchTrackTable tracks={searchResults as Track[]}/>
        )
      }
      {
        criteria === "albums" && (
          <SearchAlbum albums={searchResults as Album[]}/>
        )
      }
      {loading && <CircularProgress />}
    </Box>
  );
}

export default Search;
