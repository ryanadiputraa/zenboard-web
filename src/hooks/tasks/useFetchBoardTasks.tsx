"use client"

import { useContext, useEffect } from "react"
import { redirect } from "next/navigation"

import { AppContext } from "@/context"
import { JWTToken, getLSObject, useFetch } from "../useFetch"

export const useFetchBoardTasks = (boardId: string) => {
  const { taskDispatch } = useContext(AppContext)
  const { getBoardTasks } = useFetch()

  useEffect(() => {
    if (!boardId) return

    const jwtToken = getLSObject<JWTToken>("jwt_token")
    if (!jwtToken?.expires_in) redirect("/")

    const fetchUserBoards = async () => {
      const resp = await getBoardTasks(boardId)
      if (!resp.data) return

      taskDispatch({ type: "SET_TASKS", payload: resp.data })
    }
    fetchUserBoards()
  }, [boardId])
}
