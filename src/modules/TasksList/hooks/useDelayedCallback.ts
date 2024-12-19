import { useRef, useEffect } from 'react';

type TimerCallback = (arg?) => void;

const useDelayedCallback = (callback: TimerCallback, delay: number): () => void => {
    const timerRef = useRef<number | null>(null);

    const callWithDelay = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current!);
        }
        timerRef.current = setTimeout(callback, delay);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current!);
        };
    }, []);

    return callWithDelay;
};

export default useDelayedCallback;