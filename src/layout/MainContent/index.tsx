import {Box, styled} from "@mui/material";
import React, {FC, JSX} from "react";

const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    gridArea: "main-content",
    display: 'flex',
    alignItems: 'stretch',
    overflowX: "hidden",
}));
interface MainContentProps{
    children?: JSX.Element
}

const MainContent: FC<MainContentProps> = ({children}) => {
    return (
        <Container>
            <Box bgcolor="background.default" borderRadius={3} width="100%" height="100%" sx={{overflowY: "auto"}}>
                {children}
            </Box>
        </Container>
    );
};

export default MainContent;
