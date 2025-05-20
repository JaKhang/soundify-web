import { useState, useEffect } from 'react';

const useDebouncedClick = (delay: number) => {
    const [isFirstClick, setIsFirstClick] = useState(true);
    const [clickCount, setClickCount] = useState(0);

    // Effect to reset the first click state after the specified delay
    useEffect(() => {
            const timer = setTimeout(() => {
                setIsFirstClick(true);
                setClickCount(0); // Reset click count if needed
            }, delay);

            return () => {
                clearTimeout(timer);
            };
    }, [clickCount]);

    const handleClick = () => {
        setIsFirstClick(false)
        setClickCount(prev => prev + 1); // Increment click count
    };

    return { isFirstClick, clickCount, handleClick };
};

export default useDebouncedClick;

