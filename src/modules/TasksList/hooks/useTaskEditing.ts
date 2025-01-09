import {useEffect, useState} from "react";

const useTaskEditing = () => {
    const [editableTask, setEditableTask] = useState(null);

    const changeEditableTask = (newTaskId) => {
        setEditableTask((prev) => {
            if (prev === newTaskId) {
                return null;
            }
            return newTaskId;
        });
    };

    const resetEditableTask = (event) => {
        if (event.target.closest(`[data-role="task"]`)) {
            return;
        }
        changeEditableTask(null);
    };

    useEffect(() => {
        document.addEventListener('click', resetEditableTask);
        return () => {
            document.removeEventListener('click', resetEditableTask);
        };
    }, []);

    return {
        editableTask: editableTask,
        changeEditableTask: changeEditableTask
    }
}

export default useTaskEditing;