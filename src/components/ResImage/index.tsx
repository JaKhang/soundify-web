import React, { FC, useEffect, useRef } from "react";

interface ImageModel {
    width: number; // Minimum width for the image
    url: string;   // URL of the image
}

interface ImageProps {
    src: ImageModel[]; // Array of image objects
    alt: string;       // Alt text for the image
}

const ResImage: FC<ImageProps> = ({ src, alt }) => {
    const imgRef = useRef<HTMLImageElement | null>(null);

    const updateImageSource = () => {
        if (imgRef.current) {
            const imgWidth = imgRef.current.clientWidth;

            // Select the most suitable image based on the container width
            let selectedImage = src[0];
            for (const imageModel of src) {
                if (imageModel.width >= imgWidth) {
                    selectedImage = imageModel;
                }
            }

            // Update the image source dynamically
            imgRef.current.src = selectedImage.url;
        }
    };

    useEffect(() => {
        // Update image source initially and on resize
        updateImageSource();
        window.addEventListener("resize", updateImageSource);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", updateImageSource);
        };
    }, [src]);

    return <img ref={imgRef} alt={alt} style={{ width: "100%", maxWidth: "640px" }} />;
};

export default ResImage;
