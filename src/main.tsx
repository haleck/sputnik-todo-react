import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from "./GlobalStyles.ts";
import {ThemeProvider} from "styled-components";
import {Theme} from "./types/Theme";

const theme: Theme= {
    primary: {
        main: "#3A938D",
        light: "#5CA49F",
    },
    background: {
        content: "#F1F1F1", // Фон блоков контента
        elements: "#FFFFFF", // Фон кнопок, карточек, полей ввода и др
    },
    text: {
        primary: "#2E3838",
    },
    states: {
        disabled: "rgb(128, 128, 128)",
        hover: "#b0b0b0",
        focus: "lightgray",
        error: "tomato",
    },
    scrollbar: {
        default: "rgba(92, 164, 159, 0.8)",
    },
    font: {
        large: "26px",
        regular: "22px",
        small: "18px",
        extraSmall: "14px",
    },
    media: {
        laptop: "(max-width: 1280px)",
        tablet: "(max-width: 768px)",
        phone: "(max-width: 640px)",
        smallPhone: "(max-width: 480px)",
    }
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <App />
        </ThemeProvider>
    </StrictMode>,
)