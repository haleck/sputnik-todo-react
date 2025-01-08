import React, {FC, useState} from 'react';
import Checkbox from "../../../UI/Checkbox";
import {Task} from "../../../types/Task";
import taskService from "../../../services/TaskService";
import styled, {css} from "styled-components";
import {ITaskActionsMenu} from "../types/ActionsMenu";
import TaskContent from "./TaskContent";

interface TaskItemProps {
    task: Task
    changeActiveActionsMenu: (newActiveActionsMenu: ITaskActionsMenu) => void
}

const TaskItem: FC<TaskItemProps> = ({task, changeActiveActionsMenu}) => {
    const [completed, setCompleted] = useState<boolean>(task.status === "completed");

    const switchCheckbox = (): void => {
        taskService.switchTaskCompleted(task.id);
        setCompleted(!completed);
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

    return (
        <StyledTaskItem $isCompleted={completed}>
            <Checkbox
                checked={completed}
                onChange={switchCheckbox}
                style={{ marginTop: 4 }}
            />
            <TaskContent
                completed={completed}
                task={task}
            />
            <OptionsSvg
                data-role={'actionsSvg'}
                onClick={handleOptionsClick}
                style={{ marginTop: 4, cursor: 'pointer' }}
            />
        </StyledTaskItem>
    );
};

const OptionsSvg = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="32px"
        width="24px"
        viewBox="0 -960 960 960"
        fill="var(--main-color)"
        {...props}
    >
        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
    </svg>
);

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