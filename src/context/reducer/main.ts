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

    default:
      return state
  }
}

export interface MainState {
  isSidebarOpen: boolean
  dashboardPages: DashboardPages
  activeDashboardPage: DashboardPage
}

export type MainActions =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_ACTIVE_DASHBOARD_PAGE"; payload: DashboardPage }

export interface DashboardPages {
  [label: string]: DashboardPage
}

export interface DashboardPage {
  label: string
  ico: ReactElement
  link: string
}
