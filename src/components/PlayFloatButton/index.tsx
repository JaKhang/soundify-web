import styles from './index.module.css';
import {Play as PlayIcon, Pause as PauseIcon} from "lucide-react";
import {RefObject} from "react";

interface PlayToggleProps {
    playing?: boolean;
    onClick?: () => void;
    ref?: RefObject<HTMLButtonElement>;
}

const PlayToggle = ({playing, onClick, ref}: PlayToggleProps) => {
    return (
        <button ref={ref} className={styles.Button} onClick={onClick}>
            <span className={styles.Icon}>
            {playing ? (<PauseIcon fill="back" strokeWidth={0} className={styles.Icon}/>) : (<PlayIcon fill="back" strokeWidth={0} className={styles.Icon}/>)}
            </span>
        </button>
    );
};

export default PlayToggle;
