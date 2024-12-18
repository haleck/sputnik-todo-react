import axios from "axios";
import { Task } from "../interfaces/Task";
import {AxiosResponse} from "axios";

export default class TasksApi {
    private readonly _apiUrl: string = "https://jsonplaceholder.typicode.com/todos/";

    async fetchTasks(): Promise<AxiosResponse<Task[]>> {
        return axios.get<Task[]>(this._apiUrl, { params: { _limit: 10 } });
    }

    async addTask(task: Task): Promise<AxiosResponse<Task>> {
        return axios.post<Task>(this._apiUrl, task);
    }

    async switchTaskCompleted(taskId: number, completed: boolean): Promise<AxiosResponse<Task>> {
        return axios.patch<Task>(`${this._apiUrl}${taskId}`, { completed });
    }

    async changeTaskTitle(taskId: number, newTitle: string): Promise<AxiosResponse<Task>> {
        return axios.patch<Task>(`${this._apiUrl}${taskId}`, { title: newTitle });
    }

    async deleteTask(taskId: number): Promise<AxiosResponse> {
        return axios.delete(`${this._apiUrl}${taskId}`);
    }
}