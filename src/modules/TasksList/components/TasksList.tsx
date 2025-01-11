import React, {FC, useEffect, useRef, useState} from 'react';
import TaskItem from "./TaskItem.tsx";
import {observer} from "mobx-react-lite";
import taskService, {tasksStore} from "../../../services/TaskService";
import Error from "../../../UI/Error";
import Loader from "../../../UI/Loader";
import styled from "styled-components";
import TaskActionsMenu from "./TaskActionsMenu";
import ConfirmationModal from "../../../components/ConfirmationModal";
import useTaskActionsMenu from "../hooks/useTaskActionsMenu";
import useTaskEditing from "../hooks/useTaskEditing";

const TasksList: FC = observer(({tasks}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const listRef = useRef<HTMLDivElement | null>(null);

    const {activeActionsMenu, changeActiveActionsMenu} = useTaskActionsMenu()
    const {editableTask, changeEditableTask} = useTaskEditing()

    useEffect(() => {
        const fetchTasks = async (): Promise<void> => {
            setIsLoading(true)
            await taskService.fetchTasks();
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }

        fetchTasks()
    }, []);

    const deleteTask = (taskId): void => {
        setShowConfirmationModal(false);
        changeActiveActionsMenu({task: null, position: null});
        taskService.deleteTask(taskId);
    };

    if (isLoading) return <Loader title="Получение списка задач..."/>;
    if (tasksStore.error) return <Error message={tasksStore.error}/>;
    if (!isLoading && tasksStore.tasks.length === 0) return <StyledEmptyList>Список задач пуст</StyledEmptyList>

    return (
        <>
            <StyledTasksList ref={listRef}>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        changeActiveActionsMenu={changeActiveActionsMenu}
                        editable={editableTask === task.id}
                        setEditableTask={changeEditableTask}
                    />
                ))}
            </StyledTasksList>
            {activeActionsMenu.task && activeActionsMenu.position && (
                <TaskActionsMenu
                    position={activeActionsMenu.position}
                    onDelete={() => setShowConfirmationModal(true)}
                />
            )}
            {showConfirmationModal &&
                <ConfirmationModal
                    isOpen={showConfirmationModal}
                    title="Подтверждение удаления"
                    message={`Вы уверены, что хотите удалить задачу "${activeActionsMenu.task?.title}"?`}
                    onConfirm={() => deleteTask(activeActionsMenu.task?.id)}
                    onCancel={()=> setShowConfirmationModal(false)}
                />
            }
        </>
    );
});

const StyledEmptyList = styled.div`
  text-align: center;
  font-size: ${props=> props.theme.font.regular};
  font-weight: 500;
  color: ${props => props.theme.states.disabled};
  margin-block: 13px;
`

const StyledTasksList = styled.div`
  scrollbar-gutter: stable;
  overflow: auto;
  margin-top: 10px;
  scrollbar-color: ${props => props.theme.scrollbar.color};
  padding-right: calc(20px - ${props => props.theme.scrollbar.width});

  &::-webkit-scrollbar {
    width: ${props => props.theme.scrollbar.width};
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    opacity: 1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.scrollbar.color};
    border-radius: 10px;
    border: none;
    transition: background-color 0.15s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${props => props.theme.primary.light};
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;


export default TasksList;