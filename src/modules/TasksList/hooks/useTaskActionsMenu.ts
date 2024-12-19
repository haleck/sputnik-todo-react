import {useEffect, useState} from "react";
import {ITaskActionsMenu} from "../types/Types";

const useTaskActionsMenu = () => {
    const [activeActionsMenu, setActiveActionsMenu] = useState<ITaskActionsMenu>({task: null, position: null});

    const changeActiveActionsMenu = (newActionMenu: ITaskActionsMenu) => {
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
        changeActiveActionsMenu({task: null, position: null});
    };

    useEffect(() => {
        document.addEventListener('click', closeActionsMenu);
        return () => {
            document.removeEventListener('click', closeActionsMenu);
        };
    }, []);

    return {
        activeActionsMenu,
        changeActiveActionsMenu
    }
}

export default useTaskActionsMenu;