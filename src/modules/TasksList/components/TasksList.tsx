import React, {FC, useEffect, useRef, useState} from 'react';
import TaskItem from "./TaskItem.tsx";
import {observer} from "mobx-react-lite";
import {reaction} from "mobx";
import taskService, {tasksStore} from "../../../services/TaskService";
import Error from "../../../UI/Error";
import Loader from "../../../UI/Loader";
import styled from "styled-components";
import TaskActionsMenu from "./TaskActionsMenu";
import ConfirmationModal from "../../../components/ConfirmationModal";
import updatePaddingRight from "../helpers/updatePaddingRight";
import scrollToTheEndOfList from "../helpers/scrollToTheEndOfList";
import useDelayedCallback from "../hooks/useDelayedCallback";
import useTaskActionsMenu from "../hooks/useTaskActionsMenu";

const TasksList: FC = observer(() => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [prevTasksArrLen, setPrevTasksArrLen] = useState<number>(0)

    const listRef = useRef<HTMLDivElement | null>(null);

    const delayedUpdatePaddingRight = useDelayedCallback(()=>updatePaddingRight(listRef), 0)
    const delayedScrollToTheEndOfList = useDelayedCallback(()=>scrollToTheEndOfList(listRef), 100)

    const {activeActionsMenu, changeActiveActionsMenu} = useTaskActionsMenu()


    useEffect(() => {
        const fetchTasks = async (): Promise<void> => {
            setIsLoading(true)
            await taskService.fetchTasks();
            setTimeout(() => {
                setIsLoading(false)
                delayedUpdatePaddingRight()
            }, 500)
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
                {tasksStore.tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        changeActiveActionsMenu={changeActiveActionsMenu}
                        delayedUpdatePaddingRight={delayedUpdatePaddingRight}
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
  overflow-y: auto;
  margin-top: 10px;
  scrollbar-color: ${props => props.theme.scrollbar.default};

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    opacity: 1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.scrollbar.default};
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