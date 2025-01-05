import TasksApi from "../api/TasksApi";
import TasksStore from "../store/TasksStore";
import {Task} from "../types/Task";

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

            const tasks = response.data.data.map(item => {
                return {
                    id: item.id,
                    ...item.attributes
                }
            })

            this.store.setTasks(tasks);
        } catch (error: any) {
            this.store.setError(error.message);
        }
    }

    async addTask(task: Omit<Task, "id">): Promise<void> {
        console.log(`test ${task}`)
        if (task.title.length === 0) return

        const tempTask: Task = {...task, id: Date.now()};
        this.store.addTask(tempTask);

        try {
            const response = await this.api.addTask(task);

            this.store.deleteTask(tempTask.id)
            this.store.addTask({...tempTask, id: response.data.data.id});
        } catch (error: any) {
            this.store.deleteTask(tempTask.id);
            this.store.setError(error.message);
        }
    }

    async switchTaskCompleted(taskId: number): Promise<void> {
        const task = this.findTaskInStore(taskId);
        if (!task) return;

        const newTask = {...task, status: task.status === "completed" ? "not completed" : "completed"};
        this.store.updateTask(newTask);

        try {
            await this.api.updateTask(newTask);
        } catch (error: any) {
            this.store.updateTask(task);
            this.store.setError(error.message);
        }
    }

    async changeTaskTitle(taskId: number, newTitle: string): Promise<void> {
        const task = this.findTaskInStore(taskId);
        if (!task) return;

        const newTask = {...task, title: newTitle};
        this.store.updateTask(newTask);

        try {
            await this.api.updateTask(newTask);
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

    findTaskInStore(taskId: number) {
        return this.store.tasks.find((task) => task.id === taskId);
    }
}

export const tasksStore = new TasksStore()
const tasksApi = new TasksApi()
const taskService = new TasksService(tasksApi, tasksStore);
export default taskService;