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

    case "REORDER_TASK":
      const reordered = [...state.tasks]
      reordered.forEach((task) => {
        if (task.id !== action.task_id) return
        const [removed] = task.tasks.splice(action.sourceIdx, 1)
        task.tasks.splice(action.destionationIdx, 0, removed)
      })

      return {
        ...state,
        tasks: reordered,
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
  | {
      type: "REORDER_TASK"
      task_id: string
      sourceIdx: number
      destionationIdx: number
    }
