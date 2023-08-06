import { FetchResponse, JWTToken, parseErrorMsg } from "../hooks/fetch/useFetch"

export interface UserInfo {
  id: string
  first_name: string
  last_name: string
  email: string
  picture: string
  locale: string
  created_at: string
  verified_email: boolean
}

export async function fetchUserInfo(
  baseURL: string,
  headers: HeadersInit
): Promise<FetchResponse<UserInfo | null>> {
  try {
    const resp = await fetch(baseURL + "/api/users/", {
      headers: headers,
      cache: "no-store",
    })
    const json = await resp.json()
    if (!resp.ok) throw new Error(json.error)
    return { data: json.data ?? null, error: "" }
  } catch (error) {
    const errMsg = parseErrorMsg(error)
    return { data: null, error: errMsg }
  }
}

export async function refreshAccessToken(
  baseURL: string,
  headers: HeadersInit
): Promise<FetchResponse<JWTToken | null>> {
  try {
    const resp = await fetch(baseURL + "/oauth/refresh", {
      method: "POST",
      headers: headers,
      cache: "no-store",
    })
    const json = await resp.json()
    if (!resp.ok) throw new Error(json.error)
    return { data: json.data ?? null, error: "" }
  } catch (error) {
    const errMsg = parseErrorMsg(error)
    return { data: null, error: errMsg }
  }
}
