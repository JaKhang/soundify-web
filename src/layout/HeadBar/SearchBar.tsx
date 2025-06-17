import React, {useEffect, useRef, useState} from 'react';
import {Box, IconButton, OutlinedInput, styled, Tooltip} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const SearchInput = styled(OutlinedInput)(({theme}) => ({
  borderRadius: 240,
  backgroundColor: theme.palette.background.paper,

  '.MuiOutlinedInput-input': {
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
  const [query, setQuery] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        navigate('/search', {state: query.trim()});
      } else {
        // Chỉ navigate khi không phải đang reset
        if (!isResetting && location.pathname === '/search') {
          navigate('/');
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, navigate]); // Thêm criteria vào dependency

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = prevLocation.current;

    if (previousPath === '/search' && currentPath !== '/search') {
      console.log('Leaving search page, clearing query');
      setIsResetting(true); // Bật flag
      setQuery('');
      // Reset flag sau khoảng ngắn
      setTimeout(() => setIsResetting(false), 100);
    }

    prevLocation.current = currentPath;
  }, [location.pathname]);

  const { t } = useTranslation();

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box position="relative">
      <SearchInput
        placeholder={t('search.placeholder')}
        value={query}
        onChange={handleQuery}
      />
      <SearchIcon fontSize="medium" sx={{
        position: 'absolute',
        left: 12,
        top: "50%",
        transform: 'translateY(-50%)',
        color: 'text.secondary'
      }}/>
      <Tooltip title={t('search.explore')}>
        <IconButton
          sx={{position: 'absolute', right: 12, top: "50%", transform: 'translateY(-50%)', color: 'text.secondary'}}>
          <ExploreIcon fontSize="medium"/>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SearchBar;
