import React, {FC, useEffect, useRef, useState} from 'react';
import TaskItem from "./components/TaskItem/TaskItem.tsx";
import {observer} from "mobx-react-lite";
import {reaction} from "mobx";
import taskService, {tasksStore} from "../../services/TaskService";
import Error from "../../UI/Error/Error";
import Loader from "../../UI/Loader/Loader";
import styled from "styled-components";
import TaskActionsMenu from "./components/TaskActionsMenu";
import {ITaskActionsMenu} from "./types/Types";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import updatePaddingRight from "./helpers/updatePaddingRight";
import scrollToTheEndOfList from "./helpers/scrollToTheEndOfList";
import useDelayedCallback from "./hooks/useDelayedCallback";

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
    const [activeActionsMenu, setActiveActionsMenu] = useState<ITaskActionsMenu>({task: null, position: null});

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const listRef = useRef<HTMLDivElement | null>(null);

    const delayedUpdatePaddingRight = useDelayedCallback(()=>updatePaddingRight(listRef), 0)
    const delayedScrollToTheEndOfList = useDelayedCallback(()=>scrollToTheEndOfList(listRef), 100)


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
                delayedUpdatePaddingRight()
                // delayedScrollToTheEndOfList() нужно делать проверку, что список увеличился
            }
        );

        return () => {
            disposer();
        };
    }, []);

    const changeActiveActionMenu = (newActionMenu: ITaskActionsMenu) => {
        setActiveActionsMenu((prev: ITaskActionsMenu) => {
            if (prev.task?.id === newActionMenu.task?.id) {
                return {task: null, position: null};
            }
            return {...newActionMenu};
        });
    };

    const closeActionsMenu = (event) => {
        const ignoreElements = ['actions', 'actionsSvg', 'modal'];
        if (ignoreElements.some(role => event.target.closest(`[data-role="${role}"]`))) {
            return;
        }
        changeActiveActionMenu({task: null, position: null});
    };

    useEffect(() => {
        document.addEventListener('click', closeActionsMenu);
        return () => {
            document.removeEventListener('click', closeActionsMenu);
        };
    }, []);

    const deleteTask = (taskId) => {
        taskService.deleteTask(taskId);
        setShowConfirmationModal(false);
        changeActiveActionMenu({task: null, position: null});
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
                        changeActiveActionsMenu={changeActiveActionMenu}
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