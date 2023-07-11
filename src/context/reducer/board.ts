import { Board } from "@/data/board"

export const boardReducer = (state: BoardState, action: BoardActions) => {
  switch (action.type) {
    case "SET_USER_BOARDS":
      return {
        ...state,
        boards: action.payload,
      }

    case "SET_ACTIVE_BOARD":
      return {
        ...state,
        activeBoard: action.board,
      }

    default:
      return state
  }
}

export interface BoardState {
  boards: Board[]
  activeBoard: Board
}

export type BoardActions =
  | { type: "SET_USER_BOARDS"; payload: Board[] }
  | { type: "SET_ACTIVE_BOARD"; board: Board }
