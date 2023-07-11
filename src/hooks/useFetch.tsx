"use client"

import { FetchUserBoards } from "@/data/board"
import { fetchUserInfo, refreshAccessToken } from "@/data/user"

export type FetchResponse<T> = {
  data: T
  error: string
}

export interface JWTToken {
  access_token: string
  expires_in: number
  refresh_token: string
}

export const useFetch = () => {
  const BASE_URL = String(process.env.NEXT_PUBLIC_BASE_API_URL)
  const jwtToken = getLSObject<JWTToken>("jwt_token")
  const headers = { Authorization: `Bearer ${jwtToken?.access_token}` }
  const refreshHeders = { Authorization: `Bearer ${jwtToken?.refresh_token}` }

  const setAccessTokens = (jwtToken: JWTToken) => {
    saveLSObject("jwt_token", jwtToken)
  }

  const getUserInfo = async () => fetchUserInfo(BASE_URL, headers)
  const refreshJWTToken = async () => {
    const resp = await refreshAccessToken(BASE_URL, refreshHeders)
    if (resp.data) {
      setAccessTokens(resp.data)
      location.reload()
    }
  }
  const getUserBoards = async () => FetchUserBoards(BASE_URL, headers)

  return {
    setAccessTokens,
    getUserInfo,
    refreshJWTToken,
    getUserBoards,
  }
}

export const saveLSObject = (key: string, object: any) => {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(object))
}

export const getLSObject = <T,>(key: string): T | null => {
  if (typeof window === "undefined") return null
  const val = localStorage.getItem(key)
  const obj: T = JSON.parse(val ?? "{}")
  return obj
}

export function parseErrorMsg(error: unknown): string {
  if (error instanceof Error) return error.message
  return "sonething wen't wrong, please try again later"
}
