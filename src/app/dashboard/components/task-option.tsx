"use client"

import { GoTrash } from "react-icons/go"

export const TaskOption = ({
  taskId,
  socketSend,
  callback,
}: {
  taskId: string
  socketSend: (key: string, data: any) => void
  callback: () => any
}): JSX.Element => {
  const options = [
    {
      name: "delete",
      ico: <GoTrash />,
      func: () => socketSend("delete_task", { task_id: taskId }),
    },
  ]

  return (
    <ul
      className="py-2 text-sm text-black"
      aria-labelledby="dropdownDefaultButton"
    >
      {options.map((option, i) => (
        <li
          key={i}
          className="cursor-pointer block px-4 py-2 hover:bg-accent hover:text-white"
          onClick={() => {
            option.func()
            callback()
          }}
        >
          <span className="capitalize flex items-center justify-between">
            {option.name} {option.ico}
          </span>
        </li>
      ))}
    </ul>
  )
}
