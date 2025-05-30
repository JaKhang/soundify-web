import React, {FC, JSX} from 'react';
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {ListItemText} from "@mui/material";

interface DropMenuItemProps {
    onClick: () => void,
    label: string,
    icon: JSX.Element
}

const DropMenuItem : FC<DropMenuItemProps> = ({label, onClick, icon}) => {
    return (
        <MenuItem onClick={() => onClick()}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
        </MenuItem>
    );
};

export default DropMenuItem;
