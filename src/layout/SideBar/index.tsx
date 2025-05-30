import React, {useState} from 'react';
import {
    Box,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    styled,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {useLayoutSelector} from "@redux/selector.ts";
import {useLayoutAction} from "@redux/action.ts";
import {useAppDispatch} from "@redux/store.ts";
import {
    AddCircleOutlined,
    AutoAwesomeMotionOutlined,
    Close,
    FormatListBulleted,
    Output,
    Search
} from '@mui/icons-material';
import {useTranslation} from "react-i18next";
import ResImage from "@components/ResImage";
import {tracks} from "@models/mock.ts";

const recentList = [
    {id: 1, title: "Mới nhất"},
    {id: 2, title: "Cũ nhất"},
    {id: 3, title: "A - Z"},
    {id: 4, title: "Z - A"},
]

const Container = styled(Box)(({theme}) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    gridArea: "side-bar"
}));

const SideBar = () => {
    const {openSidebar} = useLayoutSelector();
    const dispatch = useAppDispatch();
    const {toggleSidebar} = useLayoutAction();
    const {t} = useTranslation();
    const [searching, setSearching] = useState<boolean>(false);
    const [openRecent, setOpenRecent] = useState<boolean>(false);

    const handleOpen = () => {
        if (openSidebar) {
            if (searching) setSearching(!searching);
            if (openRecent) setOpenRecent(!openRecent);
        }
        dispatch(toggleSidebar());
    }

    const handleSearching = () => {
        setSearching(!searching);
    }

    const handleOpenRecent = () => {
        setOpenRecent(!openRecent);
    }

    return (
        <Container sx={{width: openSidebar ? 320 : 80}}>
            <Stack direction={openSidebar ? "row" : "column"} justifyContent="space-between" alignItems="center" mb={1}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={1}>
                    <Tooltip title={
                        <p style={{fontSize: 14, padding: 0, margin: 0}}>
                            {openSidebar ? t('sidebar.close') : t('sidebar.open')}</p>
                    }
                             placement={openSidebar ? "top" : "right"}
                    >
                        <IconButton
                            disableRipple
                            onClick={handleOpen}
                            sx={{
                                '& .icon-default': {
                                    opacity: 1,
                                    transition: 'opacity 0.3s ease'
                                },
                                '& .icon-hover': {
                                    position: 'absolute',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                },
                                '&:hover .icon-default': {
                                    opacity: 0
                                },
                                '&:hover .icon-hover': {
                                    opacity: 1
                                }
                            }}
                        >
                            <AutoAwesomeMotionOutlined
                                className="icon-default"
                                sx={{rotate: "270deg", fontSize: 24}}
                            />
                            {openSidebar ? <Output className="icon-hover" sx={{fontSize: 24, rotate: "180deg"}}/> :
                                <Output className="icon-hover" sx={{fontSize: 24}}
                                />}
                        </IconButton>
                    </Tooltip>
                    {openSidebar &&
                       <Typography variant="h6" fontWeight="bold">
                           {t('sidebar.title')}
                       </Typography>}
                </Stack>
                <Tooltip title={<p style={{fontSize: 14, padding: 0, margin: 0}}>
                    {t('sidebar.add')}</p>} placement={openSidebar ? "top" : "right"}>
                    <IconButton disableRipple sx={{
                        '&:hover .icon-hover-primary': {
                            color: 'primary.main'
                        }
                    }}>
                        <AddCircleOutlined className="icon-hover-primary"
                                           sx={{
                                               fontSize: 24,
                                               color: 'rgb(0, 0, 0, 0.35)',
                                               transition: 'color 0.3s ease'
                                           }}/>
                    </IconButton>
                </Tooltip>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                {(!searching && openSidebar) &&
                   <IconButton disableRipple
                               onClick={handleSearching}
                               sx={{
                                   '&:hover svg': {
                                       color: 'primary.main'
                                   }
                               }}>
                      <Search sx={{color: 'rgb(0, 0, 0, 0.4)', transition: 'color 0.3s ease'}}/>
                   </IconButton>}

                {(searching && openSidebar) &&
                   <TextField placeholder={t('sidebar.search')}
                              variant="outlined"
                              size="small"
                              slotProps={{
                                  input: {
                                      startAdornment: (
                                          <InputAdornment position="start">
                                              <Search sx={{color: 'rgb(0, 0, 0, 0.4)'}}/>
                                          </InputAdornment>
                                      ),
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <IconButton disableRipple
                                                          onClick={handleSearching}
                                                          sx={{'&:hover svg': {rotate: '180deg'}}}>
                                                  <Close sx={{color: '#f44336', transition: 'rotate 0.3s ease'}}/>
                                              </IconButton>
                                          </InputAdornment>
                                      )
                                  }
                              }}
                   />}

                {openSidebar &&
                   <Box position="relative">
                      <IconButton disableRipple
                                  sx={{
                                      '&:hover, &:hover svg': {color: 'primary.main'},
                                      fontSize: 14,
                                      position: 'relative'
                                  }}
                                  onClick={handleOpenRecent}>
                          {!searching &&
                             <p style={{fontSize: 13, padding: 0, margin: '0 4px 0 0'}}>{t('sidebar.recent')}</p>}
                         <FormatListBulleted sx={{color: 'rgb(0, 0, 0, 0.4)'}}/>
                      </IconButton>

                       {openRecent &&
                          <List sx={{
                              bgcolor: 'background.default',
                              position: 'absolute',
                              top: 40,
                              right: 0,
                              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                              zIndex: 1000,
                              borderRadius: '4px'
                          }}>
                              {recentList.map((item) => (
                                  <ListItem disablePadding key={item.id}>
                                      <ListItemButton dense sx={{
                                          borderRadius: "4px",
                                          padding: openSidebar ? 'undefined' : 0,
                                          minWidth: 200
                                      }}>
                                          <ListItemText
                                              sx={{'& .MuiListItemText-primary': {fontSize: 16}}}
                                              slotProps={{
                                                  primary: {noWrap: true},
                                                  secondary: {noWrap: true}
                                              }}
                                              primary={item.title}/>
                                      </ListItemButton>
                                  </ListItem>
                              ))}
                          </List>
                       }
                   </Box>
                }
            </Stack>

            <List sx={{bgcolor: 'background.paper'}}>
                <ListItem disablePadding sx={{marginBottom: !openSidebar ? 1 : 0}}>
                    <ListItemButton dense sx={{borderRadius: "4px", padding: openSidebar ? 'undefined' : 0}}>
                        <ListItemAvatar>
                            <Box width={40} height={40} overflow="hidden" borderRadius="4px">
                                <ResImage src={tracks[0]?.album.images || []} alt={''}/>
                            </Box>
                        </ListItemAvatar>
                        {openSidebar && (
                            <ListItemText
                                sx={{'& .MuiListItemText-primary': {color: 'primary.main', fontSize: 18}}}
                                // color={"primary"}
                                slotProps={{
                                    primary: {noWrap: true},
                                    secondary: {noWrap: true}
                                }}
                                primary={tracks[0]?.name}

                                secondary={tracks[0]?.artists.map(artist => artist.name).join(', ')}/>
                        )}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton dense sx={{borderRadius: "4px", padding: openSidebar ? 'undefined' : 0}}>
                        <ListItemAvatar>
                            <Box width={40} height={40} overflow="hidden" borderRadius="4px">
                                <ResImage src={tracks[0]?.album.images || []} alt={''}/>
                            </Box>
                        </ListItemAvatar>
                        {openSidebar && (
                            <ListItemText
                                sx={{'& .MuiListItemText-primary': {color: 'primary.main', fontSize: 18}}}
                                // color={"primary"}
                                slotProps={{
                                    primary: {noWrap: true},
                                    secondary: {noWrap: true}
                                }}
                                primary={tracks[0]?.name}

                                secondary={tracks[0]?.artists.map(artist => artist.name).join(', ')}/>
                        )}
                    </ListItemButton>
                </ListItem>
            </List>
        </Container>
    );
};

export default SideBar;
