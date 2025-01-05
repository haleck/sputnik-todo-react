import { Task } from "../types/Task";

interface SingleTaskResponse {
    data: {
        id: number;
        attributes: Omit<Task, "id">;
    };
    meta: Object;
}

interface TaskListResponse {
    data: Array<{
        id: number;
        attributes: Omit<Task, "id">;
    }>;
    meta: Object;
}

export default class TasksApi {
    private _taskIdCounter: number = 1;
    private _tasks: Task[] = [];
    private _delay: number = 300
    private _initialTasksCount = 20

    constructor() {
        for (let i = 0; i < this._initialTasksCount; i++) {
            if (i === 10) {
                this._tasks.push({
                    id: this._taskIdCounter++,
                    title: `Task ${i + 1} asdhf ol;jasdhfkjlashd lkfjhaslkjdfhjlkasdh flkjashdjklfhaslkjdfhkjl23hjklh sdkfhasjkldhf jklasdhfjkl askjldfha jlksdfhljkh2jk3lr hkjlsdhfkjlsa dhflkjashdfkj lashdjklf askljdfh lkjasdhfkjsd`,
                    description: `Description for Task ${i + 1} asdhf ol;jasdhfkjlashd lkfjhaslkjdfhjlkasdh flkjashdjklfhaslkjdfhkjl23hjklh sdkfhasjkldhf jklasdhfjkl askjldfha jlksdfhljkh2jk3lr hkjlsdhfkjlsa dhflkjashdfkj lashdjklf askljdfh lkjasdhfkjsd`,
                    status: "pending"
                });
            } else {
                this._tasks.push({
                    id: this._taskIdCounter++,
                    title: `Task ${i + 1}`,
                    description: `Description for Task ${i + 1}`,
                    status: i % 2 === 0 ? "completed" : "pending"
                });
            }
        }
    }

    async fetchTasks(): Promise<{ data: TaskListResponse }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        data: this._tasks.map((task) => ({
                            id: task.id,
                            attributes: {
                                title: task.title,
                                description: task.description,
                                status: task.status
                            }
                        })),
                        meta: {}
                    }
                });
            }, this._delay);
        });
    }

    async addTask(task: Omit<Task, "id">): Promise<{ data: SingleTaskResponse }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newTask: Task = {
                    id: this._taskIdCounter++,
                    ...task
                };
                this._tasks.push(newTask);
                resolve({
                    data: {
                        data: {
                            id: newTask.id,
                            attributes: {
                                title: newTask.title,
                                description: newTask.description,
                                status: newTask.status
                            }
                        },
                        meta: {}
                    }
                });
            }, this._delay);
        });
    }

    async updateTask(task: Task): Promise<{ data: SingleTaskResponse }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const taskIndex = this._tasks.findIndex(t => t.id === task.id);
                if (taskIndex >= 0) {
                    this._tasks[taskIndex] = task;
                    resolve({
                        data: {
                            data: {
                                id: task.id,
                                attributes: {
                                    title: task.title,
                                    description: task.description,
                                    status: task.status
                                }
                            },
                            meta: {}
                        }
                    });
                } else {
                    resolve({
                        data: {
                            data: {
                                id: task.id,
                                attributes: task
                            },
                            meta: {}
                        }
                    });
                }
            }, this._delay);
        });
    }

    async deleteTask(taskId: number): Promise<{ data: SingleTaskResponse }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this._tasks = this._tasks.filter(task => task.id !== taskId);
                resolve({
                    data: {
                        data: {
                            id: taskId,
                            attributes: {
                                title: "Deleted Task",
                                description: "This task was deleted.",
                                status: "deleted"
                            }
                        },
                        meta: {}
                    }
                });
            }, this._delay);
        });
    }
}

