import { useRef, useEffect } from 'react';

type TimerCallback = (arg?) => void;

/**
 * Хук, который возвращает функцию для отложенного вызова переданного коллбэка.
 * Автоматически очищает таймер при повторном вызове или размонтировании компонента.
 *
 * @param {TimerCallback} callback - Функция, которая будет вызвана с задержкой.
 * @param {number} delay - Задержка в миллисекундах перед вызовом коллбэка.
 * @returns {() => void} - Функция для запуска отложенного вызова.
 *
 * @example
 * const delayedLog = useDelayedCallback(() => console.log('Hello!'), 2000);
 * delayedLog(); // вызовется через 2 секунды
 */
const useDelayedCallback = (callback: TimerCallback, delay: number) => {
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