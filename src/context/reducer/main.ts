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
  dashboardPages: Page[]
  activeDashboardPage: Page
}

export type MainActions =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_ACTIVE_DASHBOARD_PAGE"; payload: Page }

export type DashboardPageList = "Dashboard" | "Settings"

export interface Page {
  label: DashboardPageList
  ico: ReactElement
  link: string
}
