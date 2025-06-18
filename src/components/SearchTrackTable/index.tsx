import React from 'react';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {AccessTime as AccessTimeIcon} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Links from '../Links';
import {Track} from "@models/Track.ts";
import {convertSecondsToMMSS} from "../../utils";

interface SearchTableProp {
  tracks: Track[]
}

const SearchTrackTable = ({tracks}: SearchTableProp) => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const onTrackClick = (track: Track, _: number) => {
    const album = track.album
    if (album) {
      navigate(`/albums/${track.album.id}`);
    } else {
      alert("Không tìm thấy album phù hợp với track này")
    }
  }

  return (
    <TableContainer sx={{overflow: "hidden"}}>
      <Table sx={{minWidth: 650}} aria-label="tracks table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width="4%">#</TableCell>
            <TableCell>{t("label.title")}</TableCell>
            <TableCell>Album</TableCell>
            <TableCell align="center" width="10%">
              <AccessTimeIcon fontSize="small"/>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* 🎵 Table Body */}
        <TableBody>
          {tracks.map((track, index) => {
            return (
              <TableRow
                key={track.id}
                hover
                onClick={() => onTrackClick(track, index)}
                sx={{
                  '& td, & th': {border: 0},
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                {/* 🔢 Track Number / Playing Animation */}
                <TableCell align="center">
                    <Typography
                    >
                      {index + 1}
                    </Typography>
                </TableCell>

                {/* 🎵 Track Info */}
                <TableCell>
                  <Box width="fit-content">
                    {/* Track Name */}
                    <Typography
                      sx={{
                        "& *": {
                          font: "inherit",
                          color: "inherit",
                          textDecoration: "none"
                        },
                        marginBottom: 1,
                        "&:hover": {
                          textDecoration: "underline"
                        },
                        color: "inherit"
                      }}
                    >
                      <Link to={`/track/${track.id}`}>
                        {track.name}
                      </Link>
                    </Typography>

                    {/* Artists */}
                    <Typography
                      variant="subtitle2"
                      sx={{
                        "& *": {
                          font: "inherit",
                          color: "inherit",
                          textDecoration: "none"
                        },
                        "&:hover": {
                          textDecoration: "underline"
                        },
                      }}
                    >
                      <Links
                        items={track.artists.map(artist => ({
                          label: artist.name,
                          to: `/artists/${artist.id}`
                        }))}
                      />
                    </Typography>
                  </Box>
                </TableCell>

                {/* 🎛️ Album (Hidden by default, show on hover) */}
                <TableCell>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '200px',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline'
                      }
                    }}
                    onClick={() => navigate(`/album/${track.album?.id}`)}
                  >
                    {track.album?.name || 'Unknown Album'}
                  </Typography>
                </TableCell>

                {/* ⏱️ Duration */}
                <TableCell align="center">
                  <Typography variant="body2">
                    {convertSecondsToMMSS(track.duration)}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchTrackTable;
