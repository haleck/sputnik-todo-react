import React, {FC, useRef, useState} from 'react';
import Checkbox from "../../../UI/Checkbox";
import AutoResizeTextarea from "../../../UI/AutoResizeTextarea";
import {Task} from "../../../types/Task";
import taskService, {tasksStore} from "../../../services/TaskService";
import styled, {css} from "styled-components";
import {ITaskActionsMenu} from "../types/ActionsMenu";
import useDelayedCallback from "../hooks/useDelayedCallback";

interface TaskItemProps {
    task: Task
    changeActiveActionsMenu: (newActiveActionsMenu: ITaskActionsMenu) => void
    delayedUpdatePaddingRight?: () => void
}

const TaskItem: FC<TaskItemProps> = ({task, changeActiveActionsMenu, delayedUpdatePaddingRight}) => {
    const [title, setTitle] = useState<string>(task.title);
    const [completed, setCompleted] = useState<boolean>(task.status === "completed");
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

    const switchCheckbox = (): void => {
        taskService.switchTaskCompleted(task.id);
        setCompleted(!completed);
    };

    const changeTaskTitle = (): void => {
        taskService.changeTaskTitle(task.id, title);
    };

    const handleOptionsClick = (event: React.MouseEvent): void => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        changeActiveActionsMenu({
            task: task,
            position: {
                top: rect.bottom,
                left: rect.left,
            }
        });
    }

    const handleTitleClick = (): void => {
        if (!isEditing) {
            setIsEditing(true);
            delayedUpdatePaddingRight && delayedUpdatePaddingRight()
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


    return (
        <StyledTaskItem $isCompleted={completed}>
            <Checkbox
                checked={completed}
                onChange={switchCheckbox}
                style={{ marginTop: 4 }}
            />
            {isEditing ? (
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
            )}
            <OptionsSvg
                data-role={'actionsSvg'}
                style={{ fill: 'var(--main-color)', marginTop: 4, cursor: 'pointer', height: 32 }}
                onClick={handleOptionsClick}
            />
        </StyledTaskItem>
    );
};

const OptionsSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" {...props}>
        <path
            d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
        />
    </svg>
);

const TitleDisplay = styled.div`
  width: 100%;
  cursor: pointer;
  white-space: pre-wrap;
  word-break: break-word;
  overflow: hidden;
  padding: 3px;
`;

const StyledTaskItem = styled.div<{ $isCompleted: boolean }>`
  display: flex;
  padding: 5px 10px;
  margin-bottom: 10px;
  gap: 5px;
  transition: all 0.15s ease;
  background-color: ${props => props.theme.background.elements};
  border-radius: 10px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  &:focus-within {
    background-color: ${props => props.theme.states.focus};
  }

  &:hover {
    background-color: ${props => props.theme.states.hover};
    cursor: pointer;
    border-radius: 10px;
  }

  ${({ $isCompleted }) => $isCompleted && css`
    & > textarea, div {
      text-decoration: line-through;
      color: ${props => props.theme.states.disabled};
    }
  `}
`;

export default TaskItem;