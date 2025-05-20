import {alpha, Slider as MUISlider, styled} from "@mui/material";





const Slider = styled(MUISlider)(({theme}) => ({
    color: theme.palette.primary.main,
    height: 4,
    '& .MuiSlider-thumb': {
        width: 0,
        height: 0,
        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
        '&::before': {
            boxShadow: '0 2px 12px 0 ' + alpha(theme.palette.primary.main, 0.48),
        },
        '&:hover, &.Mui-focusVisible': {
            height: 8,
            width: 8,
            boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 16/100)}`,
            ...theme.applyStyles('dark', {
                boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 16/100)}`,
            }),
        },
        '&.Mui-active': {
            width: 20,
            height: 20,
        },
    },
    '& .MuiSlider-rail': {
        opacity: 0.28,
    },
    ...theme.applyStyles('dark', {
        color: '#fff',
    }),
}))

export default Slider