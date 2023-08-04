import { Task, TaskItem } from "@/data/task"

export const taskReducer = (state: TaskState, action: TaskAction) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      }

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.task_id),
      }

    default:
      return state
  }
}

export interface TaskState {
  tasks: Task[]
}

export type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; task_id: string }
