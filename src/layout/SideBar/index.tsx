import React from 'react';
import {Box, styled} from "@mui/material";
import {useLayoutSelector} from "@redux/selector.ts";

const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    gridArea: "side-bar"
}));


const SideBar = () => {
    const {openSidebar} = useLayoutSelector()
    return (
        <Container sx={{width: openSidebar ? 320 : 80}}>
        </Container>
    );
};

export default SideBar;
