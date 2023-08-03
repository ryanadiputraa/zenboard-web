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
      const { isOpen, title, type, onConfirm, onClose } = action.payload
      return {
        ...state,
        modal: {
          isOpen: isOpen ?? false,
          type: type ?? null,
          title: title ?? "",
          onClose: onClose ?? function () {},
          onConfirm: onConfirm ?? function () {},
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
}

export type MainActions =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_ACTIVE_DASHBOARD_PAGE"; payload: DashboardPage }
  | { type: "TOGGLE_MODAL"; payload: ModalStatePayload }
  | { type: "TOGGLE_TOAST"; payload: ToastStatePayload }

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
  onClose: () => any
  onConfirm: () => any
}

type ModalStatePayload = Partial<ModalState>

type ModalType = null | "Confirm"

export interface ToastState {
  isOpen: boolean
  msg: string
  type: ToastType
}

type ToastStatePayload = Partial<ToastState>

type ToastType = "SUCCESS" | "ERROR" | "WARNING"
