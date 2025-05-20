import React from 'react';
import {Box, styled, OutlinedInput, Theme, IconButton, Tooltip} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import {useTranslation} from "react-i18next";


const SearchInput = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: 240,
    backgroundColor: theme.palette.background.paper,

    '.MuiOutlinedInput-input' : {
        padding: "12px 48px",
        width: 420,

    },

    '.MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
        borderColor: theme.palette.grey[200],
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[400],

    }
}));

const SearchBar = () => {
    const {t} = useTranslation();
    return (
        <Box position="relative">
            <SearchInput placeholder={t('search.placeholder')} />
            <SearchIcon fontSize="medium"  sx={{ position: 'absolute', left: 12, top:"50%", transform: 'translateY(-50%)', color: 'text.secondary' }}/>
            <Tooltip title={t('search.explore')}>
                <IconButton sx={{ position: 'absolute', right: 12, top:"50%", transform: 'translateY(-50%)', color: 'text.secondary' }}>
                    <ExploreIcon fontSize="medium"  />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default SearchBar;
