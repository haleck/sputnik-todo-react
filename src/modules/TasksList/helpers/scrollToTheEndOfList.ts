/**
 * Функция для прокрутки списка до конца, устанавливает для scrollTop значение scrollHeight.
 * Используется для автоматической прокрутки к последнему элементу списка.
 *
 * @param {React.RefObject<HTMLElement>} listRef - Ссылка на DOM-элемент списка, который нужно прокрутить.
 * @returns {void} Функция не возвращает значения.
 */
const scrollToTheEndOfList = (listRef) => {
    if (listRef.current) {
        listRef.current!.scrollTop = listRef.current!.scrollHeight;
    }
}

export default scrollToTheEndOfList