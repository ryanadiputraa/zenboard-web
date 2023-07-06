"use client"

import { useContext, useEffect } from "react"

import { AppContext } from "@/context"
import { useFetch } from "@/hooks/fetch"

export default function Dashboard(): JSX.Element {
  const { userDispatch } = useContext(AppContext)
  const { getUserInfo } = useFetch()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const resp = await getUserInfo()
      if (!resp.data) return
      userDispatch({ type: "SET_USER_INFO", payload: resp.data })
    }
    fetchUserInfo()
  }, [])

  return <div className="px-4 py-2 bg-grey-light h-full">Dashboard</div>
}
