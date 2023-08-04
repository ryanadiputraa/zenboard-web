"use client"

import { FormEvent, useContext, useState } from "react"

import { AppContext } from "@/context"
import { sendMessage } from "@/hooks/websocket/useWebSocket"

export const AddTask = (): JSX.Element => {
  const { main, mainDispatch } = useContext(AppContext)
  const [task, setTask] = useState<string>("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!main.websocket) return
    sendMessage(main.websocket, "create_task", {
      task_name: task,
    })
    mainDispatch({ type: "TOGGLE_MODAL", payload: {} })
  }

  return (
    <div className="p-12">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <input
          type="text"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-accent focus:ring-accent focus:border-accent block w-full p-2.5"
          placeholder="task..."
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className="btn-primary self-center">
          Save
        </button>
      </form>
    </div>
  )
}
