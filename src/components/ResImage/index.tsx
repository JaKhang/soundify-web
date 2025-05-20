import React, {FC, useEffect, useRef} from 'react';
import {Image} from "@models/Image.ts";

interface ImageProps {
    src: Image[],
    alt: string,

}

const ResImage: FC<ImageProps> = ({src, alt}) => {
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const updateImageSource = () => {
            if (imgRef.current) {
                const imgWidth = imgRef.current.clientWidth;

                let selectedImage = src[0];
                for (const imageModel of src) {
                    if (imageModel.width >= imgWidth) {
                        selectedImage = imageModel;
                    }
                }
                imgRef.current.src = selectedImage.url;
            }
        };

        updateImageSource();


        return () => {
        };
    }, [src]);

    return <img ref={imgRef} alt={alt} style={{ width: '100%', maxWidth: '640px' }} />;
};

export default ResImage;
