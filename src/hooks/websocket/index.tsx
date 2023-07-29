"use client"

import { useContext, useEffect, useState } from "react"

import { AppContext } from "@/context"
import { JWTToken, getLSObject } from "../useFetch"

export const UseWebSocket = () => {
  const { board } = useContext(AppContext)
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

    ws.onmessage = (e) => {
      // TODO: handle messages
      console.log(e.data)
    }

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
