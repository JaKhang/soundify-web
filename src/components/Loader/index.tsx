import {keyframes} from '@mui/system';
import {styled} from '@mui/material/styles';
import {Box} from "@mui/material";

const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const LoaderWrapper = styled('div')(({theme}) => ({
    width: 50,
    aspectRatio: '1',
    display: 'grid',
    border: '4px solid transparent',
    borderRadius: '50%',
    borderRightColor: theme.palette.primary.main,
    animation: `${rotate} 1s infinite linear`,

    '&::before, &::after': {
        content: '""',
        gridArea: '1/1',
        margin: 2,
        border: 'inherit',
        borderRadius: '50%',
    },

    '&::before': {
        animation: `${rotate} 2s infinite linear`,
    },

    '&::after': {
        margin: 8,
        animation: `${rotate} 3s infinite linear`,
    },

}));

// Usage
const Loader = () => {
    return <Box sx={{
        position: 'absolute',
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
    }}>
        <LoaderWrapper/>
    </Box>;
};

export default Loader;
