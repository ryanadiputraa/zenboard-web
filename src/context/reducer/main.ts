import { ReactElement } from "react"

export const mainReducer = (state: MainState, action: MainActions) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      }

    case "SET_ACTIVE_DASHBOARD_PAGE":
      return {
        ...state,
        activeDashboardPage: action.payload,
      }

    case "TOGGLE_MODAL":
      const { isOpen, title, type } = action.payload
      return {
        ...state,
        modal: {
          isOpen: isOpen ?? false,
          type: type ?? null,
          title: title ?? "",
        },
      }

    case "TOGGLE_TOAST":
      const { isOpen: toastOpen, msg, type: toastType } = action.payload
      return {
        ...state,
        toast: {
          isOpen: toastOpen ?? false,
          msg: msg ?? "",
          type: toastType ?? "SUCCESS",
        },
      }

    case "SET_WEBSOCKET":
      return {
        ...state,
        websocket: action.socket,
      }

    default:
      return state
  }
}

export interface MainState {
  isSidebarOpen: boolean
  dashboardPages: DashboardPages
  activeDashboardPage: DashboardPage
  modal: ModalState
  toast: ToastState
  websocket: WebSocket | null
}

export type MainActions =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_ACTIVE_DASHBOARD_PAGE"; payload: DashboardPage }
  | { type: "TOGGLE_MODAL"; payload: ModalStatePayload }
  | { type: "TOGGLE_TOAST"; payload: ToastStatePayload }
  | { type: "SET_WEBSOCKET"; socket: WebSocket | null }

export interface DashboardPages {
  [label: string]: DashboardPage
}

export interface DashboardPage {
  label: string
  ico: ReactElement
  link: string
}

export interface ModalState {
  isOpen: boolean
  type: ModalType
  title: string
}

type ModalStatePayload = Partial<ModalState>

type ModalType = null | "ADD_TASK"

export interface ToastState {
  isOpen: boolean
  msg: string
  type: ToastType
}

type ToastStatePayload = Partial<ToastState>

type ToastType = "SUCCESS" | "ERROR" | "WARNING"
