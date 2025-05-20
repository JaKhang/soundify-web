import React, {FC, JSX} from 'react';
import {Box, styled} from "@mui/material";
import SideBar from "@layout/SideBar";
import HeadBar from "@layout/HeadBar";
import ControlBar from "@layout/ControlBar";
import QueueBar from "@layout/QueueBar";
import {useLayoutSelector} from "@redux/selector.ts";
import MainContent from "@layout/MainContent";
import { Outlet } from 'react-router-dom';
const Container = styled(Box)(({theme}) => ({
    width: "100%",
    height: '100vh',
    display: 'grid',
    gridTemplateAreas: "'head-bar head-bar head-bar' 'side-bar main-content queue-bar' 'control-bar control-bar control-bar'",
    gridTemplateColumns: "min-content 1fr min-content",
    gridTemplateRows: "min-content 1fr min-content",
    backgroundColor: theme.palette.background.paper,
}));



const Layout = () => {
    const {hideLayout} = useLayoutSelector()

    return (
        <Container>
            {!hideLayout &&
                <>
                    <SideBar/>
                    <HeadBar/>
                    <ControlBar/>
                    <QueueBar/>
                    <MainContent>
                        <Outlet/>
                    </MainContent>
                </>
            }
        </Container>
    );
};

export default Layout;
