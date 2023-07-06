"use client"

import React, { createContext, Dispatch, useReducer } from "react"
import { AiOutlineHome } from "react-icons/ai"
import { MainActions, mainReducer, MainState } from "./reducer/main"
import { UserActions, userReducer, UserState } from "./reducer/user"

type InitialStateType = {
  main: MainState
  user: UserState
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
  user: {
    userInfo: {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      picture: "",
      locale: "",
      created_at: "",
      verified_email: false,
    },
  },
}

const AppContext = createContext<{
  main: MainState
  mainDispatch: Dispatch<MainActions>
  user: UserState
  userDispatch: Dispatch<UserActions>
}>({
  main: initialState.main,
  mainDispatch: () => null,
  user: initialState.user,
  userDispatch: () => null,
})

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mainState, mainDispatch] = useReducer(
    (main: MainState, actions: MainActions) => mainReducer(main, actions),
    initialState.main
  )
  const [userState, userDispatch] = useReducer(
    (user: UserState, actions: UserActions) => userReducer(user, actions),
    initialState.user
  )

  return (
    <AppContext.Provider
      value={{
        main: mainState,
        mainDispatch,
        user: userState,
        userDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
