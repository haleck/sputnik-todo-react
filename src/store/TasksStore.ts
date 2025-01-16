import { makeAutoObservable, computed } from "mobx";
import { Task } from "../types/Task";

export default class TasksStore {
    tasks: Task[] = [];
    maxTaskTitleLength: number = 300;
    error: string | null = null;
    filter: string = "all";
    sortField: string = "createdAt";
    sortOrder: "asc" | "desc" = "desc";

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

    deleteTask(taskId: number | string): void {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    setFilter(filter: string): void {
        this.filter = filter;
    }

    setError(message: string | null): void {
        console.error(message);
        this.error = message;
    }

    setSortField(field: "createdAt" | "updatedAt" | "title"): void {
        this.sortField = field;
    }

    setSortOrder(order: "asc" | "desc"): void {
        this.sortOrder = order;
    }

    sortTasks(tasks: Task[]): Task[] {
        return tasks.slice().sort((a, b) => {
            let comparison = 0;

            if (this.sortField === "createdAt" || this.sortField === "updatedAt") {
                const dateA = new Date(a[this.sortField]);
                const dateB = new Date(b[this.sortField]);

                comparison = dateA.getTime() - dateB.getTime();
            } else if (this.sortField === "title") {
                comparison = a.title.localeCompare(b.title);
            }

            if (this.sortOrder === "desc") {
                comparison = -comparison;
            }

            return comparison;
        });
    }

    get filteredTasks(): Task[] {
        let tasks = this.tasks;

        switch (this.filter) {
            case "done":
                tasks = tasks.filter((task) => task.status === "completed");
                break;
            case "inProgress":
                tasks = tasks.filter((task) => task.status !== "completed");
                break;
            case "all":
            default:
                break;
        }

        return this.sortTasks(tasks);
    }
}

