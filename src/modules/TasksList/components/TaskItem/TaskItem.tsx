import React, {FC, useState} from 'react';
import Checkbox from "../../../../UI/Checkbox/Checkbox.jsx";
import classes from "./TaskItem.module.css";
import AutoResizeTextarea from "../../../../UI/AutoResizeTextarea/AutoResizeTextarea.jsx";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal.jsx";
import OptionsSvg from "../../../../UI/Icons/OptionsSvg.jsx";
import {ITaskActionsMenu, Task} from "../../../../types/Task";
import taskService, {tasksStore} from "../../../../services/TaskService";

const completedTaskTextStyle = {
    textDecoration: 'line-through',
    color: 'grey',
};

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
        <>
            <div className={classes.wrapper}>
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
                    style={completed ? completedTaskTextStyle : {}}
                    disabled={completed}
                />
                <OptionsSvg
                    data-role={'actionsSvg'}
                    style={{ fill: 'var(--main-color)', marginTop: 4, cursor: 'pointer', height: 32}}
                    onClick={handleOptionsClick}
                />
            </div>
        </>
    );
};

export default TaskItem;