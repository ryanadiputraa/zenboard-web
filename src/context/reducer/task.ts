import { Task, TaskItem } from "@/data/task"

export const taskReducer = (state: TaskState, action: TaskAction) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      }

    default:
      return state
  }
}

export interface TaskState {
  tasks: Task[]
}

export type TaskAction = { type: "SET_TASKS"; payload: Task[] }
