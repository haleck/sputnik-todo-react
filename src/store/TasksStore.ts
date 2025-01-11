import { makeAutoObservable, computed } from "mobx";
import { Task } from "../types/Task";

export default class TasksStore {
    tasks: Task[] = [];
    maxTaskTitleLength: number = 300;
    error: string | null = null;
    filter: string = "all";

    constructor() {
        makeAutoObservable(this, {
            filteredTasks: computed,
        });
    }

    setTasks(tasks: Task[]): void {
        this.tasks = tasks;
    }

    addTask(task: Task): void {
        this.tasks.unshift(task);
    }

    updateTask(task: Task): void {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
            this.tasks[index] = task;
        }
    }

    deleteTask(taskId: number): void {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    setFilter(filter: string): void {
        this.filter = filter;
    }

    setError(message: string | null): void {
        console.error(message);
        this.error = message;
    }

    get filteredTasks(): Task[] {
        switch (this.filter) {
            case "done":
                return this.tasks.filter((task) => task.status === "completed");
            case "inProgress":
                return this.tasks.filter((task) => task.status !== "completed");
            case "all":
            default:
                return this.tasks;
        }
    }
}
