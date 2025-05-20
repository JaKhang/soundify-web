// theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    shape: {
    },
    typography: {
        fontFamily: '"SpotifyMixUI", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeightRegular: 500
    },
});
