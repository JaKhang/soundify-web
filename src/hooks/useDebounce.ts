import { useState, useEffect } from 'react';

const useDebounced = <T>(searchTerm: T, delay: number) => {
    const [debouncedTerm, setDebouncedTerm] = useState<T>(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, delay]);

    return debouncedTerm;
};

export default useDebounced;