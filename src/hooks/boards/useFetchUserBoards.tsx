"use client"

import { useContext, useEffect } from "react"
import { redirect } from "next/navigation"

import { AppContext } from "@/context"
import { JWTToken, getLSObject, useFetch } from "../useFetch"

export const useFetchUserBoards = () => {
  const { boardDispatch } = useContext(AppContext)
  const { getUserBoards } = useFetch()

  useEffect(() => {
    const jwtToken = getLSObject<JWTToken>("jwt_token")
    if (!jwtToken?.expires_in) redirect("/")

    const fetchUserBoards = async () => {
      const resp = await getUserBoards()
      if (!resp.data) return
      boardDispatch({ type: "SET_USER_BOARDS", payload: resp.data })

      if (resp.data.length) {
        boardDispatch({ type: "SET_ACTIVE_BOARD", board: resp.data[0] })
      }
    }
    fetchUserBoards()
  }, [])
}
