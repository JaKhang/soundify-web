import React from 'react';
import {
    Avatar,
    Box,
    styled,
    Button,
    MenuItem,
    ListItemIcon,
    Divider,
    Menu,
    Tooltip,
    IconButton,
    Stack
} from "@mui/material";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import SearchBar from "@layout/HeadBar/SearchBar.tsx";
import {useAuthSelector} from "@redux/selector.ts";
import {useTranslation} from "react-i18next";
import SButton from "@components/SButton";
import {useAppDispatch} from "@redux/store.ts";
import {logout} from "@features/auth/authSlice.ts";
import {useNavigate} from "react-router";
const Container = styled(Box)(({ theme }) => ({
    height: 72,
    backgroundColor: theme.palette.background.paper,
    gridArea: "head-bar",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
}));



const HeadBar = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {principal} = useAuthSelector()
    const open = Boolean(anchorEl);
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        dispatch(logout())
    }

    function handleNavigate(to: string) {
        setAnchorEl(null);
        navigate(to)
    }

    return (
        <Container>
            <Box>
                <IconButton size="large" onClick={() => navigate(-1)}>
                    <ArrowBackIcon/>
                </IconButton>
                <IconButton size="large" onClick={() => navigate(1)}>
                    <ArrowForwardIcon/>
                </IconButton>
            </Box>
            <Stack direction="row" spacing={2} flex={1}  alignItems={'center'} justifyContent={'center'}>
                <Box>
                    <IconButton size="large" onClick={() => navigate("/")}>
                        <HomeIcon/>
                    </IconButton>
                </Box>
                <SearchBar/>
            </Stack>
            {
                principal ? (
                    <Box>
                        <Tooltip title="Index settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar src={principal.avatar[0]?.url}>

                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >

                            <MenuItem onClick={() => handleNavigate("/accounts")}>
                                <Avatar /> {t("account.title")}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                Add another account
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings  fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleLogout} >
                                <ListItemIcon>
                                    <Logout  fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (<Stack direction="row" spacing={1} alignItems={'center'}>
                    <SButton size='large' variant='text' color='primary' href='/login'>
                        {t('register.name')}
                    </SButton>
                    <SButton size='large' variant='contained' color='primary' href='/login'>
                        {t('login')}
                    </SButton>
                </Stack>)
            }
        </Container>
    );
};

export default HeadBar;
