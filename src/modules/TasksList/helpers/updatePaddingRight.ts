/**
 * Функция для обновления отступа справа на основе наличия вертикальной полосы прокрутки.
 * Добавляет отступ справа в 10px, если элемент имеет полосу прокрутки, и убирает его в противном случае.
 *
 * @param {React.RefObject<HTMLElement>} listRef - Ссылка на DOM-элемент списка, для которого проверяется наличие полосы прокрутки.
 * @returns {void} Функция не возвращает значения.
 */
const updatePaddingRight = (listRef): void => {
    const listElement = listRef.current;
    if (listElement) {
        const hasScrollbar = listElement.scrollHeight > listElement.clientHeight;

        if (hasScrollbar) {
            listElement.style.paddingRight = '10px';
        } else {
            listElement.style.paddingRight = '0';
        }
    }
}

export default updatePaddingRight