import TasksApi from "../api/TasksApi";
import TasksStore from "../store/TasksStore";
import { Task } from "../types/Task";

export class TasksService {
    private api: TasksApi;
    private store: TasksStore;

    constructor(api: TasksApi, store: TasksStore) {
        this.api = api;
        this.store = store;
    }

    async fetchTasks(): Promise<void> {
        try {
            const response = await this.api.fetchTasks();
            const tasks = response.data;

            this.store.setTasks(tasks);
        } catch (error: any) {
            this.store.setError(error.message);
        }
    }

    async addTask(task: { title: string }): Promise<void> {
        const tempTask: Task = { ...task, id: Date.now(), completed: false };
        this.store.addTask(tempTask);

        try {
            const response = await this.api.addTask(tempTask);
            const newTask = response.data

            this.store.updateTask({ ...tempTask, id: newTask.id });
        } catch (error: any) {
            this.store.deleteTask(tempTask.id);
            this.store.setError(error.message);
        }
    }

    async switchTaskCompleted(taskId: number): Promise<void> {
        const task = this.store.tasks.find((task) => task.id === taskId);
        if (!task) return;

        const tempTask = { ...task, completed: !task.completed };
        this.store.updateTask(tempTask);

        try {
            await this.api.switchTaskCompleted(taskId, tempTask.completed);
        } catch (error: any) {
            this.store.updateTask(task);
            this.store.setError(error.message);
        }
    }

    async changeTaskTitle(taskId: number, newTitle: string): Promise<void> {
        const task = this.store.tasks.find((task) => task.id === taskId);
        if (!task) return;

        const tempTask = { ...task, title: newTitle };
        this.store.updateTask(tempTask);

        try {
            await this.api.changeTaskTitle(taskId, newTitle);
        } catch (error: any) {
            this.store.updateTask(task);
            this.store.setError(error.message);
        }
    }

    async deleteTask(taskId: number): Promise<void> {
        const task = this.store.tasks.find((task) => task.id === taskId);
        if (!task) return;

        this.store.deleteTask(taskId);

        try {
            await this.api.deleteTask(taskId);
        } catch (error: any) {
            this.store.addTask(task);
            this.store.setError(error.message);
        }
    }
}

export const tasksStore = new TasksStore()
const tasksApi = new TasksApi()
const taskService = new TasksService(tasksApi, tasksStore);
export default taskService;