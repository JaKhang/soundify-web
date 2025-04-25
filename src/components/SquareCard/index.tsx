import React from 'react';
import ImageModel from "../../models/ImageModel.ts";
import styles from './index.module.css';
import Image from "../Image";

interface SquareCardProps {
    images: ImageModel[];
    title?: string;
    subtitle?: string;
    onClick?: () => void;
    onPlayLick?: () => void;
}

const SquareCard: React.FC<SquareCardProps> = ({images, onClick, subtitle, title} : SquareCardProps) => {
    return (
        <div className={styles.CardContainer} onClick={() => onClick && onClick()}>
            <div className={styles.Image}>
                <Image src={images}/>
            </div>
            <div className={styles.Content}>
                <div className={styles.Title}>{title}</div>
                <div className={styles.Subtitle}>{subtitle}</div>
            </div>
        </div>
    );
};

export default SquareCard;
