import { FetchResponse, parseErrorMsg } from "@/hooks/useFetch"

export interface Board {
  id: string
  project_name: string
  picture: string
  owner_id: string
  created_at: string
}

export async function FetchUserBoards(
  baseURL: string,
  headers: HeadersInit
): Promise<FetchResponse<Board[]>> {
  try {
    const resp = await fetch(baseURL + "/api/boards", {
      headers: headers,
      next: { revalidate: 30 },
    })
    const json = await resp.json()
    if (!resp.ok) throw new Error(json.error)
    return { data: json.data ?? [], error: "" }
  } catch (error) {
    const errMsg = parseErrorMsg(error)
    return { data: [], error: errMsg }
  }
}
