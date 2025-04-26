import styles from './index.module.css';
import {Play as PlayIcon, Pause as PauseIcon} from "lucide-react";
import {FC, RefObject} from "react";
import {Size} from "@constants/ComponentSize.ts";

interface PlayFloatButtonProps {
    playing?: boolean;
    onClick?: () => void;
    ref?: RefObject<HTMLButtonElement>;
    size?: Size
}


const PlayToggle : FC<PlayFloatButtonProps> = ({playing, onClick, ref, size = Size.MEDIUM}) => {

    return (
        <button ref={ref} className={styles.Button} onClick={onClick}>
            <span className={styles.Icon}>
            {playing ? (<PauseIcon fill="back" strokeWidth={0} className={styles.Icon}/>) : (<PlayIcon fill="back" strokeWidth={0} className={styles.Icon}/>)}
            </span>
        </button>
    );
};

export default PlayToggle;
