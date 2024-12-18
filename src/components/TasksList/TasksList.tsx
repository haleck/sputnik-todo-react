import React, {FC, useEffect, useRef, useState} from 'react';
import TaskItem from "../TaskItem/TaskItem.tsx";
import classes from "./TasksList.module.css";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
import ErrorSvg from "../../UI/Icons/ErrorSvg.jsx";
import CycleSvg from "../../UI/Icons/CycleSvg.jsx";
import useDelayedCallback from "../../hooks/useDelayedCallback";
import taskService, {tasksStore} from "../../services/TaskService";

// Нужно изменить логику стора. Разделить запросы и фактическое состояние для SOLID и устранения задержек

const TasksList: FC = observer(() => {
    const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [extraPadding, setExtraPadding] = useState<number>(0);

    const listRef = useRef<HTMLDivElement | null>(null);

    const updatePaddingRight = useDelayedCallback(() => {
        const listElement = listRef.current;
        if (listElement) {
            const hasScrollbar = listElement.scrollHeight > listElement.clientHeight;

            if (hasScrollbar) {
                listElement.style.paddingRight = '10px';
            } else {
                listElement.style.paddingRight = '0';
            }
        }
    }, 50)

    const scrollToTheEndOfList = useDelayedCallback(() => {
        if (listRef.current) {
            listRef.current!.scrollTop = listRef.current!.scrollHeight;
        }
    }, 50)

    useEffect(() => {
        const fetchTasks = async() => {
            setIsLoading(true)
            await taskService.fetchTasks();
            setTimeout(()=>setIsLoading(false), 500)
        }

        fetchTasks()

        // Добавляет отступ справа, если появился/исчез scrollbar
        const disposer = reaction(
            () => tasksStore.tasks.length,
            () => updatePaddingRight()
        );

        return () => {
            disposer();
        };
    }, []);

    const changeActiveActionMenu = (taskId) => {
        setActiveActionMenu((prevId) => {
            if (prevId === taskId || taskId === null) {
                setExtraPadding(0);
                return null;
            }

            // Если открывается меню действий для последнего элемента - списку нужно добавить отступ снизу, чтобы
            // выделить место для меню действий
            const isLastTask = tasksStore.tasks[tasksStore.tasks.length - 1]?.id === taskId;
            if (isLastTask) {
                setExtraPadding(50);
                scrollToTheEndOfList();
            } else {
                setExtraPadding(0);
            }

            return taskId;
        });
    };

    const closeActionsMenu = (event) => {
        if (
            event.target.closest('[data-role="actions"]') ||
            event.target.closest('[data-role="actionsSvg"]') ||
            event.target.closest('[data-role="modal"]')
        ) { return }

        changeActiveActionMenu(null);
    };

    React.useEffect(() => {
        document.addEventListener('click', closeActionsMenu);
        return () => {
            document.removeEventListener('click', closeActionsMenu);
        };
    }, []);

    return (
        <div
            ref={listRef}
            className={classes.todoList}
            style={{ paddingBottom: extraPadding }}
        >
            {isLoading? (
                <div className={classes.loader}>
                    <CycleSvg /> <br/>
                    Получение списка задач...
                </div>
            ) : tasksStore.error ? (
                <div className={classes.error}>
                    <ErrorSvg /> <br/>
                    Произошла ошибка <br/>
                    {tasksStore.error}
                </div>
            ) : (
                tasksStore.tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        isActiveActionMenu={activeActionMenu === task.id}
                        changeActiveActionMenu={changeActiveActionMenu}
                    />
                ))
            )}
        </div>
    );
});

export default TasksList;