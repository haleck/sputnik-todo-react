import { makeAutoObservable } from "mobx";
import { Task } from "../types/Task";

export default class TasksStore {
    tasks: Task[] = [];
    maxTaskTitleLength: number = 300;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setTasks(tasks: Task[]): void {
        this.tasks = tasks;
    }

    addTask(task: Task): void {
        this.tasks.push(task);
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

    setError(message: string | null): void {
        console.error(message)
        this.error = message;
    }
}