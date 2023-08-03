"use client"

import { Dispatch, useContext, useEffect, useState } from "react"

import { AppContext } from "@/context"
import { JWTToken, getLSObject } from "../useFetch"
import { TaskAction } from "@/context/reducer/task"
import { MainActions } from "@/context/reducer/main"

interface SocketResponseEventMsg<T> {
  key: string
  is_success: boolean
  message: string
  data?: T
}

export const UseWebSocket = () => {
  const { mainDispatch, board, taskDispatch } = useContext(AppContext)
  const [socket, setSoket] = useState<WebSocket | null>(null)
  const jwtToken = getLSObject<JWTToken>("jwt_token")

  const send = (key: string, data: any) => {
    const msg = JSON.stringify({ key, data })
    socket?.send(msg)
  }

  useEffect(() => {
    if (socket) socket.close()
    if (!board.activeBoard.id) return
    const wsURL = `${String(process.env.NEXT_PUBLIC_WS_URL)}?board_id=${
      board.activeBoard.id
    }`
    const ws = new WebSocket(wsURL)

    ws.onmessage = (e) =>
      handleSocketResponseEvent(e, mainDispatch, taskDispatch)

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          key: "auth",
          data: { access_token: jwtToken?.access_token },
        })
      )
      setSoket(ws)
    }
  }, [board.activeBoard.id])

  return { send }
}

const handleSocketResponseEvent = (
  e: MessageEvent<any>,
  mainDispatch: Dispatch<MainActions>,
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
    case "delete_task":
      const msg: SocketResponseEventMsg<string> = JSON.parse(e.data)
      if (!msg.is_success) {
        catchError(msg.message)
        return
      }
      taskDispatch({ type: "DELETE_TASK", task_id: msg.data ?? "" })
  }
}
