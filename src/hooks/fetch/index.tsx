"use client"

import { useEffect, useState } from "react"

export interface JWTToken {
  access_token: string
  expires_in: number
  refresh_token: string
}

export const useFetch = () => {
  const [jwtToken, setJwtTokens] = useState<JWTToken | null>(null)
  const BASE_URL = String(process.env.NEXT_PUBLIC_BASE_API_URL)

  useEffect(() => {
    const jwtToken = getLSObject<JWTToken>("jwt_token")
    setJwtTokens(jwtToken)
  }, [])

  const setAccessTokens = (jwtToken: JWTToken) => {
    setJwtTokens(jwtToken)
    saveLSObject("jwt_token", jwtToken)
  }

  return {
    setAccessTokens,
  }
}

const saveLSObject = (key: string, object: any) => {
  localStorage.setItem(key, JSON.stringify(object))
}

const getLSObject = <T,>(key: string): T | null => {
  const val = localStorage.getItem(key)
  const obj: T = JSON.parse(val ?? "{}")
  return obj
}
