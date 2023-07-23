"use client"

import React, { createContext, Dispatch, useReducer } from "react"
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai"

import { MainActions, mainReducer, MainState } from "./reducer/main"
import { UserActions, userReducer, UserState } from "./reducer/user"
import { BoardActions, boardReducer, BoardState } from "./reducer/board"
import { TaskAction, taskReducer, TaskState } from "./reducer/task"

type InitialStateType = {
  main: MainState
  user: UserState
  board: BoardState
  task: TaskState
}

const initialState: InitialStateType = {
  main: {
    isSidebarOpen: true,
    dashboardPages: {
      dashboard: {
        label: "dashboard",
        ico: <AiOutlineHome />,
        link: "/dashboard",
      },
      settings: {
        label: "settings",
        ico: <AiOutlineSetting />,
        link: "/dashboard/settings",
      },
    },
    activeDashboardPage: {
      label: "",
      ico: <></>,
      link: "",
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
  board: {
    boards: [],
    activeBoard: {
      id: "",
      project_name: "",
      owner_id: "",
      picture: "",
      created_at: "",
    },
  },
  task: {
    tasks: [],
  },
}

const AppContext = createContext<{
  main: MainState
  mainDispatch: Dispatch<MainActions>
  user: UserState
  userDispatch: Dispatch<UserActions>
  board: BoardState
  boardDispatch: Dispatch<BoardActions>
  task: TaskState
  taskDispatch: Dispatch<TaskAction>
}>({
  main: initialState.main,
  mainDispatch: () => null,
  user: initialState.user,
  userDispatch: () => null,
  board: initialState.board,
  boardDispatch: () => null,
  task: initialState.task,
  taskDispatch: () => null,
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
  const [boardState, boardDispatch] = useReducer(
    (board: BoardState, actions: BoardActions) => boardReducer(board, actions),
    initialState.board
  )
  const [taskState, taskDispatch] = useReducer(
    (task: TaskState, actions: TaskAction) => taskReducer(task, actions),
    initialState.task
  )

  return (
    <AppContext.Provider
      value={{
        main: mainState,
        mainDispatch,
        user: userState,
        userDispatch,
        board: boardState,
        boardDispatch,
        task: taskState,
        taskDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
