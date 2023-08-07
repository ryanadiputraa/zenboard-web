import { FetchResponse, parseErrorMsg } from "@/hooks/fetch/useFetch"

export interface Task {
  id: string
  order: number
  name: string
  tasks: TaskItem[]
}

export interface TaskDTO
  extends Pick<Task, "id" | "order">,
    Partial<Pick<Task, "name" | "tasks">> {}

export interface TaskItem {
  id: string
  description: string
  order: number
  tag: string
  assignee: string
  created_at: string
  updated_at: string
}

export async function FetchBoardTasks(
  baseURL: string,
  headers: HeadersInit,
  boardId: string
): Promise<FetchResponse<Task[]>> {
  try {
    const resp = await fetch(`${baseURL}/api/tasks/?board_id=${boardId}`, {
      headers: headers,
      cache: "no-store",
    })
    const json = await resp.json()
    if (!resp.ok) throw new Error(json.error)
    return { data: json.data ?? [], error: "" }
  } catch (error) {
    const errMsg = parseErrorMsg(error)
    return { data: [], error: errMsg }
  }
}
