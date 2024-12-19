import React, {FC, useEffect, useRef, useState} from 'react';
import TaskItem from "./components/TaskItem.tsx";
import {observer} from "mobx-react-lite";
import {reaction} from "mobx";
import taskService, {tasksStore} from "../../services/TaskService";
import Error from "../../UI/Error/Error";
import Loader from "../../UI/Loader/Loader";
import styled from "styled-components";
import TaskActionsMenu from "./components/TaskActionsMenu";
import ConfirmationModal from "../../components/ConfirmationModal";
import updatePaddingRight from "./helpers/updatePaddingRight";
import scrollToTheEndOfList from "./helpers/scrollToTheEndOfList";
import useDelayedCallback from "./hooks/useDelayedCallback";
import useTaskActionsMenu from "./hooks/useTaskActionsMenu";
import Modal from "../../components/Modal";

const StyledTasksList = styled.div`
  overflow-y: auto;
  margin-top: 10px;
  scrollbar-color: var(--scrollbar-color);

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    opacity: 1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 10px;
    border: none;
    transition: background-color 0.15s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--light-main-color);
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`

const TasksList: FC = observer(() => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [prevTasksArrLen, setPrevTasksArrLen] = useState<number>(0)

    const listRef = useRef<HTMLDivElement | null>(null);

    const delayedUpdatePaddingRight = useDelayedCallback(()=>updatePaddingRight(listRef), 0)
    const delayedScrollToTheEndOfList = useDelayedCallback(()=>scrollToTheEndOfList(listRef), 100)

    const {activeActionsMenu, changeActiveActionsMenu} = useTaskActionsMenu()


    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true)
            await taskService.fetchTasks();
            setTimeout(() => setIsLoading(false), 500)
        }

        fetchTasks()

        const disposer = reaction(
            () => tasksStore.tasks.length,
            () => {
                const currentTasksArrLen = tasksStore.tasks.length;

                delayedUpdatePaddingRight();

                setPrevTasksArrLen((prevLen) => {
                    if (prevLen < currentTasksArrLen) {
                        delayedScrollToTheEndOfList();
                    }
                    return currentTasksArrLen;
                });
            }
        );

        return () => {
            disposer();
        };
    }, []);

    const deleteTask = (taskId) => {
        taskService.deleteTask(taskId);
        setShowConfirmationModal(false);
        changeActiveActionsMenu({task: null, position: null});
    };

    if (isLoading) return <Loader title="Получение списка задач..."/>;
    if (tasksStore.error) return <Error message={tasksStore.error}/>;

    return (
        <>
            <StyledTasksList ref={listRef}>
                {tasksStore.tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        changeActiveActionsMenu={changeActiveActionsMenu}
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

export default TasksList;