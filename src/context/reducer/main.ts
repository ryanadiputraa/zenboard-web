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
      const { payload } = action
      return {
        ...state,
        modal: {
          isOpen: payload.isOpen ?? false,
          type: payload.type ?? null,
          title: payload.title ?? "",
          onClose: payload.onClose ?? function () {},
          onConfirm: payload.onConfirm ?? function () {},
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
}

export type MainActions =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_ACTIVE_DASHBOARD_PAGE"; payload: DashboardPage }
  | { type: "TOGGLE_MODAL"; payload: ModalState }

export interface DashboardPages {
  [label: string]: DashboardPage
}

export interface DashboardPage {
  label: string
  ico: ReactElement
  link: string
}

export interface ModalState {
  isOpen?: boolean
  type?: ModalType
  title?: string
  onClose?: () => any
  onConfirm?: () => any
}

type ModalType = null | "Confirm"
