import React, {FC, useState} from 'react';
import Checkbox from "../../../UI/Checkbox/Checkbox.jsx";
import AutoResizeTextarea from "../../../UI/AutoResizeTextarea/AutoResizeTextarea.jsx";
import OptionsSvg from "../icons/OptionsSvg";
import {Task} from "../../../types/Task";
import taskService, {tasksStore} from "../../../services/TaskService";
import styled, {css} from "styled-components";
import {ITaskActionsMenu} from "../types/Types";

const StyledTaskItem = styled.div`
  display: flex;
  padding: 5px 10px;
  margin-bottom: 10px;
  gap: 5px;
  transition: all 0.15s ease;
  background-color: var(--elements-background-color);
  border-radius: 10px;
  position: relative;
  &:hover {
    background-color: var(--hover-color);
    cursor: pointer;
    border-radius: 10px;
  }
  &:last-child {
    margin-bottom: 0;
  }
  &:focus-within {
    background-color: var(--focus-color);
  }
  ${({completed})=>completed && css`
    & textarea {
      text-decoration: line-through;
      color: grey;
    }
  `}
`

interface TaskItemProps {
    task: Task
    changeActiveActionsMenu: (newActiveActionsMenu: ITaskActionsMenu) => void
}

const TaskItem: FC<TaskItemProps> = ({ task, changeActiveActionsMenu }) => {
    const [title, setTitle] = useState<string>(task.title);
    const [completed, setCompleted] = useState<boolean>(task.completed);

    const switchCheckbox = () => {
        taskService.switchTaskCompleted(task.id);
        setCompleted(!completed);
    };

    const changeTaskTitle = () => {
        taskService.changeTaskTitle(task.id, title);
    };

    const handleOptionsClick = (event: React.MouseEvent) => {
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
        <StyledTaskItem completed={completed}>
            <Checkbox
                checked={completed}
                onChange={switchCheckbox}
                style={{ marginTop: 4 }}
            />
            <AutoResizeTextarea
                text={title}
                setText={setTitle}
                onBlur={changeTaskTitle}
                handleEnter={(ref) => ref.current.blur()}
                maxLength={tasksStore.maxTaskTitleLength}
                disabled={completed}
            />
            <OptionsSvg
                data-role={'actionsSvg'}
                style={{ fill: 'var(--main-color)', marginTop: 4, cursor: 'pointer', height: 32}}
                onClick={handleOptionsClick}
            />
        </StyledTaskItem>
    );
};

export default TaskItem;