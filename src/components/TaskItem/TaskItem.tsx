import React, {FC, useState} from 'react';
import Checkbox from "../../UI/Checkbox/Checkbox.jsx";
import classes from "./TaskItem.module.css";
import AutoResizeTextarea from "../../UI/AutoResizeTextarea/AutoResizeTextarea.jsx";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import OptionsSvg from "../../UI/Icons/OptionsSvg.jsx";
import {Task} from "../../interfaces/Task";
import taskService, {tasksStore} from "../../services/TaskService";

const completedTaskTextStyle = {
    textDecoration: 'line-through',
    color: 'grey',
};

interface TaskItemProps {
    task: Task
    isActiveActionMenu: Boolean
    changeActiveActionMenu: (taskId: number | null) => void
}

const TaskItem: FC<TaskItemProps> = ({ task, isActiveActionMenu, changeActiveActionMenu }) => {
    const [title, setTitle] = useState<string>(task.title);
    const [completed, setCompleted] = useState<boolean>(task.completed);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const switchCheckbox = () => {
        taskService.switchTaskCompleted(task.id);
        setCompleted(!completed);
    };

    const changeTaskTitle = () => {
        taskService.changeTaskTitle(task.id, title);
    };

    const deleteTask = () => {
        taskService.deleteTask(task.id);
        setShowConfirmationModal(false);
        changeActiveActionMenu(null);
    };

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
                    className={classes.actionsSvg}
                    onClick={() => changeActiveActionMenu(task.id)}
                />
                {isActiveActionMenu && (
                    <div
                        data-role={'actions'}
                        className={classes.actions}
                    >
                        <button onClick={()=>setShowConfirmationModal(true)}>Удалить</button>
                    </div>
                )}
            </div>
            {showConfirmationModal &&
                <ConfirmationModal
                    title="Подтверждение удаления"
                    message={`Вы уверены, что хотите удалить задачу "${title}"?`}
                    onConfirm={deleteTask}
                    onCancel={()=>setShowConfirmationModal(false)}
                />
            }
        </>
    );
};

export default TaskItem;