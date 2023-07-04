"use client"

import { useEffect } from "react"
import { redirect, useSearchParams } from "next/navigation"

import { useFetch, JWTToken } from "@/hooks/fetch"

export default function Auth(): JSX.Element {
  const searchParams = useSearchParams()
  const { setAccessTokens } = useFetch()

  const errMsg = searchParams.get("err")
  const jwtToken: JWTToken = {
    access_token: searchParams.get("access_token") ?? "",
    expires_in: Number(searchParams.get("expires_in")) ?? 0,
    refresh_token: searchParams.get("refresh_token") ?? "",
  }

  useEffect(() => {
    if (!jwtToken.access_token) return
    setAccessTokens(jwtToken)
    redirect("/")
  }, [jwtToken.access_token])

  return (
    <div className="flexrc min-h-screen text-center">
      {errMsg ? (
        <p>
          Fail to Sign In, please try again later <br />
          <span>[Err: {decodeURIComponent(errMsg)}]</span>
        </p>
      ) : null}
    </div>
  )
}
