import { DraggableLocation } from "react-beautiful-dnd"

import { Task, TaskDTO } from "@/data/task"

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
      const { sourceIdx, destinationIdx, updateTask } = action

      const reordered = [...state.tasks]
      const [removed] = reordered.splice(sourceIdx, 1)
      reordered.splice(destinationIdx, 0, removed)

      const payload: TaskDTO[] = []
      reordered.forEach((item, i) => {
        reordered[i].order = i + 1
        payload.push({ id: item.id, order: item.order })
      })
      updateTask(payload)

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
      updateTask: (data: any) => void
    }
  | {
      type: "REORDER_TASK_ITEMS"
      source: DraggableLocation
      destination: DraggableLocation
    }
