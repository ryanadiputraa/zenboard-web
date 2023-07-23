"use client"

import { useContext, useEffect } from "react"
import { redirect } from "next/navigation"

import { AppContext } from "@/context"
import { JWTToken, getLSObject, useFetch } from "../useFetch"

export const useFetchUserInfo = () => {
  const { userDispatch } = useContext(AppContext)
  const { getUserInfo, refreshJWTToken } = useFetch()

  useEffect(() => {
    const jwtToken = getLSObject<JWTToken>("jwt_token")
    if (!jwtToken?.expires_in) redirect("/")

    const fetchUserInfo = async () => {
      const now = new Date().getTime()
      if (now >= jwtToken.expires_in * 1000) await refreshJWTToken()

      const resp = await getUserInfo()
      if (!resp.data) return
      userDispatch({ type: "SET_USER_INFO", payload: resp.data })
    }
    fetchUserInfo()
  }, [userDispatch]) // eslint-disable-line
}
