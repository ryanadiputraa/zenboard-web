import { DraggableLocation } from "react-beautiful-dnd"

import { Task } from "@/data/task"

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

    case "REORDER_TASKS":
      const reordered = [...state.tasks]
      const [removed] = reordered.splice(action.sourceIdx, 1)
      reordered.splice(action.destinationIdx, 0, removed)

      return {
        ...state,
        tasks: reordered,
      }

    case "REORDER_TASK_ITEMS":
      const { source, destination } = action
      const taskSourceIdx = state.tasks.findIndex(
        (task) => task.id === source.droppableId
      )
      const taskDestinationIdx = state.tasks.findIndex(
        (task) => task.id === destination.droppableId
      )

      const newSourceItems = [...state.tasks[taskSourceIdx].tasks]
      const newDestinationItems =
        source.droppableId !== destination.droppableId
          ? [...state.tasks[taskDestinationIdx].tasks]
          : newSourceItems

      const [deleted] = newSourceItems.splice(source.index, 1)
      newDestinationItems.splice(destination.index, 0, deleted)

      const updatedTask = [...state.tasks]
      updatedTask[taskSourceIdx] = {
        ...updatedTask[taskSourceIdx],
        tasks: newSourceItems,
      }
      updatedTask[taskDestinationIdx] = {
        ...updatedTask[taskDestinationIdx],
        tasks: newDestinationItems,
      }

      return {
        ...state,
        tasks: updatedTask,
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
      type: "REORDER_TASKS"
      sourceIdx: number
      destinationIdx: number
    }
  | {
      type: "REORDER_TASK_ITEMS"
      source: DraggableLocation
      destination: DraggableLocation
    }
