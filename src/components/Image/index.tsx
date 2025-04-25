import {FC} from 'react';
import ImageModel from "../../models/ImageModel.ts";
interface ImageProps {
    src: ImageModel[]
}

interface ImageProps {
    src: ImageModel[];
    alt?: string;
}

const Image: FC<ImageProps> = ({src, alt = "Image" }) => {
    if (src.length === 0) return null;


    const srcSet = src
        .map((image) => `${image.url} ${image.width}w`)
        .join(", ");

    return (
        <img
            srcSet={srcSet}  // Danh sách ảnh có kích thước khác nhau
            sizes="(max-width: 300px) 64px, (max-width: 600px) 320px, 640px"
            alt={alt}
            style={{ maxWidth: "100%", height: "auto" }}
        />
    );
};
export default Image;
