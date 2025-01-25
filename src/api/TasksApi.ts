import axios from "axios";
import { Task } from "@types/Task";
import {AxiosResponse} from "axios";

interface SingleTaskResponse  {
    data: {
        id: number
        attributes: Omit<Task, "id">
    }
    meta: Object
}

interface TaskListResponse  {
    data: [
        {
            id: number
            attributes: Omit<Task, "id">
        }
    ]
    meta: Object
}

export default class TasksApi {
    private readonly _apiUrl: string = "https://cms.laurence.host/api/tasks/"

    async fetchTasks(): Promise<AxiosResponse<TaskListResponse>> {
        const params = {
            pagination: {
                withCount: true,
                page: 0,
                pageSize: 3000
            },
            fields: ["title", "description", "status", "createdAt", "updatedAt"]
        }

        return axios.get<TaskListResponse>(this._apiUrl, { params: params });
    }

    async addTask(task: Omit<Task, "id">): Promise<AxiosResponse<SingleTaskResponse>> {
        return axios.post<SingleTaskResponse>(this._apiUrl, {data: task});
    }

    async updateTask(task: Task): Promise<AxiosResponse<SingleTaskResponse>> {
        return axios.put<SingleTaskResponse>(`${this._apiUrl}${task.id}`, { data: task });
    }

    async deleteTask(taskId: number): Promise<AxiosResponse<SingleTaskResponse>> {
        return axios.delete<SingleTaskResponse>(`${this._apiUrl}${taskId}`);
    }
}