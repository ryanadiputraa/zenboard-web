"use client"

import { fetchUserInfo } from "./user"

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

  const setAccessTokens = (jwtToken: JWTToken) => {
    saveLSObject("jwt_token", jwtToken)
  }

  const getUserInfo = async () => fetchUserInfo(BASE_URL, headers)

  return {
    setAccessTokens,
    getUserInfo,
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

export function parseErrorMsg(error: unknown): string {
  if (error instanceof Error) return error.message
  return "sonething wen't wrong, please try again later"
}
