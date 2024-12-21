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
    },
    states: {
        disabled: string;
        hover: string;
        focus: string;
        error: string;
    },
    scrollbar: {
        default: string;
    },
    font: {
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