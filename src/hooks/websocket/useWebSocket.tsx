"use client"

import { Dispatch, useContext, useEffect } from "react"

import { AppContext } from "@/context"
import { JWTToken, getLSObject } from "../fetch/useFetch"
import { TaskAction } from "@/context/reducer/task"
import { MainActions } from "@/context/reducer/main"
import { Task } from "@/data/task"
import { BoardActions } from "@/context/reducer/board"
import { Board } from "@/data/board"

interface SocketResponseEventMsg<T> {
  key: string
  is_success: boolean
  message: string
  data?: T
}

export const sendMessage = (ws: WebSocket, key: string, data: any) => {
  const msg = JSON.stringify({ key, data })
  ws.send(msg)
}

export const UseWebSocket = () => {
  const { main, mainDispatch, board, boardDispatch, taskDispatch } =
    useContext(AppContext)
  const jwtToken = getLSObject<JWTToken>("jwt_token")

  useEffect(() => {
    if (main.websocket) return
    if (!board.activeBoard.id) return
    const wsURL = `${String(process.env.NEXT_PUBLIC_WS_URL)}?board_id=${
      board.activeBoard.id
    }`
    const ws = new WebSocket(wsURL)

    ws.onmessage = (e) =>
      handleSocketResponseEvent(e, mainDispatch, boardDispatch, taskDispatch)

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          key: "auth",
          data: { access_token: jwtToken?.access_token },
        })
      )
      mainDispatch({ type: "SET_WEBSOCKET", socket: ws })
    }

    return () => main.websocket?.close()
  }, [board.activeBoard.id])
}

const handleSocketResponseEvent = (
  e: MessageEvent<any>,
  mainDispatch: Dispatch<MainActions>,
  boardDispatch: Dispatch<BoardActions>,
  taskDispatch: Dispatch<TaskAction>
) => {
  const msg: SocketResponseEventMsg<any> = JSON.parse(e.data)
  console.log(msg)

  const catchError = (msg: string) => {
    mainDispatch({
      type: "TOGGLE_TOAST",
      payload: { isOpen: true, msg: msg, type: "ERROR" },
    })
  }

  switch (msg.key) {
    case "change_project_name":
      const changeProjectNameMsg: SocketResponseEventMsg<Board> = JSON.parse(
        e.data
      )
      if (!changeProjectNameMsg.is_success) {
        catchError(changeProjectNameMsg.message)
        return
      }
      if (!changeProjectNameMsg.data) break
      boardDispatch({
        type: "SET_ACTIVE_BOARD",
        board: changeProjectNameMsg.data,
      })
      break

    case "create_task":
      const createTaskMsg: SocketResponseEventMsg<Task> = JSON.parse(e.data)
      if (!createTaskMsg.is_success) {
        catchError(createTaskMsg.message)
        return
      }
      if (!createTaskMsg.data) break
      taskDispatch({ type: "ADD_TASK", payload: createTaskMsg.data })
      mainDispatch({
        type: "TOGGLE_TOAST",
        payload: { isOpen: true, type: "SUCCESS", msg: "Task created!" },
      })
      break

    case "delete_task":
      const deleteTaskMsg: SocketResponseEventMsg<string> = JSON.parse(e.data)
      if (!deleteTaskMsg.is_success) {
        catchError(deleteTaskMsg.message)
        return
      }
      taskDispatch({ type: "DELETE_TASK", task_id: deleteTaskMsg.data ?? "" })
      mainDispatch({
        type: "TOGGLE_TOAST",
        payload: { isOpen: true, type: "SUCCESS", msg: "Task deleted!" },
      })
      break
  }
}
