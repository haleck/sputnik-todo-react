export const getShortedText = (text: string, maxLength: number): string => {
    if (!text) return ''
    if (text.length > maxLength) {
        let shortedText = text.slice(0, maxLength)

        while (/[, ]$/.test(shortedText)) {
            shortedText = shortedText.slice(0, -1)
        }

        return shortedText + '...'
    }
    return text
};