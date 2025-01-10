export type Theme = {
    primary: {
        main: string;
        light: string;
    },
    background: {
        content: string;
        elements: string;
    },
    text: {
        primary: string;
        secondary: string;
    },
    states: {
        disabled: string;
        hover: string;
        focus: string;
        error: string;
    },
    scrollbar: {
        color: string;
        width: string;
    },
    font: {
        extraLarge: string;
        large: string;
        regular: string;
        small: string;
        extraSmall: string;
    },
    media: {
        laptop: string;
        tablet: string;
        phone: string;
        smallPhone: string;
    }
}