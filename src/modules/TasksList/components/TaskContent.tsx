import React, {useRef, useState} from 'react';
import AutoResizeTextarea from "../../../UI/AutoResizeTextarea";
import taskService, {tasksStore} from "../../../services/TaskService";
import useDelayedCallback from "../hooks/useDelayedCallback";
import styled from "styled-components";

const TaskContent = ({completed, task}) => {
    const [title, setTitle] = useState<string>(task.title);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const delayedFocus = useDelayedCallback(()=>{
        const textarea = textareaRef.current
        if (textarea) {
            textarea.focus()
            textarea.setSelectionRange(
                textarea.value.length,
                textarea.value.length
            )
        }
    }, 100)

    const changeTaskTitle = (): void => {
        taskService.changeTaskTitle(task.id, title);
    };

    const handleTitleClick = (): void => {
        if (!isEditing) {
            setIsEditing(true);
            delayedFocus()
        }
    }

    const handleBlur = (): void => {
        setIsEditing(false);
        changeTaskTitle();
    }

    const getShortedTitle = (text: string, maxLength: number): string => {
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

    return isEditing ? (
        <AutoResizeTextarea
            text={title}
            setText={setTitle}
            onBlur={handleBlur}
            handleEnter={(ref) => ref.current.blur()}
            maxLength={tasksStore.maxTaskTitleLength}
            ref={textareaRef}
        />
    ) : (
        <TitleDisplay
            onClick={handleTitleClick}
            $isCompleted={completed}
        >
            {getShortedTitle(title, 80)}
        </TitleDisplay>
    );
};

const TitleDisplay = styled.div`
  width: 100%;
  cursor: pointer;
  white-space: pre-wrap;
  word-break: break-word;
  overflow: hidden;
  padding: 3px;
`;

export default TaskContent;