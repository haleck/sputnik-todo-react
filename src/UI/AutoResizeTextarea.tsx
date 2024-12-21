import React, { FC, useEffect, useRef } from 'react';
import styled from "styled-components";

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    text: string;
    setText: (newText: string) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    maxLength: number;
    handleEnter?: (args?: any) => void;
}

const AutoResizeTextarea: FC<AutoResizeTextareaProps> = ({
        text,
        setText,
        onBlur,
        maxLength,
        handleEnter,
        ...props
    }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            adjustTextareaHeight(textareaRef.current!);
        }
    }, [text]);

    const adjustTextareaHeight = (element: HTMLTextAreaElement): void => {
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const inputText = e.target.value;
        const remainingLength = maxLength - inputText.length;

        if (remainingLength >= 0) {
            setText(inputText);
        } else {
            setText(inputText.slice(0, maxLength));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && handleEnter) {
            e.preventDefault();
            handleEnter(textareaRef);
        }
    };

    return (
        <StyledTextarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            rows={1}
            {...props}
        />
    );
};

const StyledTextarea = styled.textarea`
  resize: none;
  overflow: hidden;
  font-size: ${props => props.theme.font.regular};
  width: 100%;
  border: none;
  color: ${props => props.theme.text.primary};
  outline: none;
  font-weight: 400;
  background-color: inherit;
  cursor: default;
`;

export default AutoResizeTextarea;