import { useMemo } from "react";

const useFilteredTasks = (tasks, filter) => {
    const filterTasks = (tasks, filter) => {
        switch (filter) {
            case "done":
                return tasks.filter(task => task.status === "completed");
            case "inProgress":
                return tasks.filter(task => task.status !== "completed");
            case "all":
            default:
                return tasks;
        }
    };

    return useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
};

export default useFilteredTasks;
