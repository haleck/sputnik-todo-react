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
    private _taskIdCounter: number = 21;
    private _tasks: Task[] = [
        {
            id: 1,
            title: "Setup project structure",
            description: "Organize the project folder structure and initialize required dependencies.",
            status: "completed",
            createdAt: "2025-01-01T09:00:00Z",
            updatedAt: "2025-01-02T12:00:00Z",
        },
        {
            id: 2,
            title: "Implement authentication",
            description: "Create login and registration functionality for the application.",
            status: "completed",
            createdAt: "2025-01-02T10:00:00Z",
            updatedAt: "2025-01-04T14:30:00Z",
        },
        {
            id: 3,
            title: "Add user profile page",
            description: "Develop a page where users can view and edit their profile information.",
            status: "completed",
            createdAt: "2025-01-05T11:00:00Z",
            updatedAt: "2025-01-10T16:20:00Z",
        },
        {
            id: 4,
            title: "Implement task management",
            description: "Allow users to create, update, and delete tasks in their workspace.",
            status: "in-progress",
            createdAt: "2025-01-06T08:45:00Z",
            updatedAt: "2025-01-12T10:00:00Z",
        },
        {
            id: 5,
            title: "Test API endpoints",
            description: "Ensure all API endpoints return correct data and handle errors gracefully.",
            status: "pending",
            createdAt: "2025-01-08T15:00:00Z",
            updatedAt: "2025-01-08T15:00:00Z",
        },
        {
            id: 6,
            title: "Write unit tests",
            description: "Increase code coverage by writing unit tests for core features.",
            status: "in-progress",
            createdAt: "2025-01-09T09:30:00Z",
            updatedAt: "2025-01-11T10:15:00Z",
        },
        {
            id: 7,
            title: "Set up CI/CD pipeline",
            description: "Integrate a pipeline to automate testing, building, and deployment.",
            status: "completed",
            createdAt: "2025-01-03T14:00:00Z",
            updatedAt: "2025-01-05T18:20:00Z",
        },
        {
            id: 8,
            title: "Design landing page",
            description: "Create a visually appealing landing page for marketing purposes.",
            status: "pending",
            createdAt: "2025-01-04T12:45:00Z",
            updatedAt: "2025-01-07T09:50:00Z",
        },
        {
            id: 9,
            title: "Optimize database queries",
            description: "Improve the performance of database queries to reduce response times.",
            status: "completed",
            createdAt: "2025-01-07T16:00:00Z",
            updatedAt: "2025-01-09T11:25:00Z",
        },
        {
            id: 10,
            title: "Fix login bugs",
            description: "Resolve issues related to incorrect login validations.",
            status: "completed",
            createdAt: "2025-01-06T13:00:00Z",
            updatedAt: "2025-01-07T13:45:00Z",
        },
        {
            id: 11,
            title: "Create dashboard analytics",
            description: "Provide a dashboard for users to view activity and task statistics.",
            status: "pending",
            createdAt: "2025-01-09T14:15:00Z",
            updatedAt: "2025-01-10T17:10:00Z",
        },
        {
            id: 12,
            title: "Enhance mobile responsiveness",
            description: "Ensure the application is fully responsive on mobile devices.",
            status: "in-progress",
            createdAt: "2025-01-08T11:00:00Z",
            updatedAt: "2025-01-12T09:15:00Z",
        },
        {
            id: 13,
            title: "Add forgot password functionality",
            description: "Allow users to reset their password via email verification.",
            status: "completed",
            createdAt: "2025-01-05T10:00:00Z",
            updatedAt: "2025-01-06T15:30:00Z",
        },
        {
            id: 14,
            title: "Improve app performance",
            description: "Optimize code and assets to enhance application speed.",
            status: "pending",
            createdAt: "2025-01-10T10:00:00Z",
            updatedAt: "2025-01-12T18:00:00Z",
        },
        {
            id: 15,
            title: "Implement dark mode",
            description: "Add a toggle to switch between light and dark themes.",
            status: "completed",
            createdAt: "2025-01-03T09:00:00Z",
            updatedAt: "2025-01-04T14:10:00Z",
        },
        {
            id: 16,
            title: "Refactor codebase",
            description: "Restructure the codebase to improve readability and maintainability.",
            status: "in-progress",
            createdAt: "2025-01-02T11:00:00Z",
            updatedAt: "2025-01-08T12:15:00Z",
        },
        {
            id: 17,
            title: "Add user notifications",
            description: "Notify users of important events and updates in real-time.",
            status: "pending",
            createdAt: "2025-01-09T15:30:00Z",
            updatedAt: "2025-01-10T17:20:00Z",
        },
        {
            id: 18,
            title: "Document API endpoints",
            description: "Provide comprehensive documentation for all API endpoints.",
            status: "completed",
            createdAt: "2025-01-01T08:30:00Z",
            updatedAt: "2025-01-04T13:00:00Z",
        },
        {
            id: 19,
            title: "Integrate payment gateway",
            description: "Allow users to make payments via a secure payment gateway.",
            status: "in-progress",
            createdAt: "2025-01-06T10:00:00Z",
            updatedAt: "2025-01-09T11:00:00Z",
        },
        {
            id: 20,
            title: "Conduct usability testing",
            description: "Gather feedback from users to improve the overall user experience.",
            status: "pending",
            createdAt: "2025-01-10T12:00:00Z",
            updatedAt: "2025-01-12T16:45:00Z",
        },
    ];
    private _delay: number = 300

    constructor() {}

    async fetchTasks(): Promise<{ data: TaskListResponse }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        data: this._tasks.map((task) => ({
                            id: task.id,
                            attributes: task
                        })),
                        meta: {}
                    }
                });
            }, this._delay);
        });
    }

    async addTask(task: Omit<Task, "id">): Promise<{ data: SingleTaskResponse }> {
        const dateNow = new Date();

        return new Promise((resolve) => {
            setTimeout(() => {
                const newTask: Task = {
                    ...task,
                    id: this._taskIdCounter++,
                    createdAt: dateNow.toISOString(),
                    updatedAt: dateNow.toISOString()
                };
                this._tasks.push(newTask);
                resolve({
                    data: {
                        data: {
                            id: newTask.id,
                            attributes: newTask
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
                                attributes: {updatedAt: Date.now() , ...task}
                            },
                            meta: {}
                        }
                    });
                } else {
                    resolve({
                        data: {
                            data: {
                                id: task.id,
                                attributes: {updatedAt: Date.now() , ...task}
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