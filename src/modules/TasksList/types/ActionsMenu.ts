import {Task} from "../../../types/Task";

export interface Position {
    top: number
    left: number
}

export interface ITaskActionsMenu {
    task: Task | null
    position: Position | null
}