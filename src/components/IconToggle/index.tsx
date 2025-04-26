import React, {JSX, ReactNode} from 'react';
import {Size} from "@constants/ComponentSize.ts";
import styles from "./index.module.css"
import clsx from "clsx";

interface IconButtonProps {
    active? : boolean
    icon: JSX.Element | ReactNode
    activeIcon?: JSX.Element | ReactNode
}


const IconToggle: React.FC<IconButtonProps> = ({active, icon, activeIcon = icon}) => {
    return (
        <button className={clsx(
            styles.Button,
            active && styles.Active,
        )}>
            <span className={styles.Icon}>
                {active ? activeIcon : icon}
            </span>
        </button>
    );
};

export default IconToggle;
