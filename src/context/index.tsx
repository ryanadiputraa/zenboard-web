"use client"

import React, { createContext, Dispatch, useReducer } from "react"
import { AiOutlineHome } from "react-icons/ai"
import { MainActions, mainReducer, MainState } from "./reducer/main"

type InitialStateType = {
  main: MainState
}

const initialState: InitialStateType = {
  main: {
    isSidebarOpen: true,
    dashboardPages: [
      {
        label: "Dashboard",
        ico: <AiOutlineHome />,
        link: "/dashboard",
      },
    ],
    activeDashboardPage: {
      label: "Dashboard",
      ico: <AiOutlineHome />,
      link: "/dashboard",
    },
  },
}

const AppContext = createContext<{
  main: MainState
  mainDispatch: Dispatch<MainActions>
}>({
  main: initialState.main,
  mainDispatch: () => null,
})

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mainState, mainDispatch] = useReducer(
    (main: MainState, actions: MainActions) => mainReducer(main, actions),
    initialState.main
  )

  return (
    <AppContext.Provider
      value={{
        main: mainState,
        mainDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
