"use client"

import { useContext, useState } from "react"
import { HiPlus } from "react-icons/hi"
import { SlOptions } from "react-icons/sl"
import { GoTrash } from "react-icons/go"

import { AppContext } from "@/context"
import { useFetchUserBoards } from "@/hooks/boards/useFetchUserBoards"
import { useFetchBoardTasks } from "@/hooks/tasks/useFetchBoardTasks"
import { BoardList } from "./components/board-list"
import { TaskItem } from "./components/task-item"
import { UseWebSocket } from "@/hooks/websocket"

const tagColors = [
  "#EB455F",
  "#F49D1A",
  "#19376D",
  "#42855B",
  "#635985",
  "#19A7CE",
  "#57C5B6",
]

const tagColorsHashMap: { [key: string]: string } = {}

export default function Dashboard(): JSX.Element {
  const { main, board, task } = useContext(AppContext)
  const [taskOption, setTaskOption] = useState<number>(-1)

  const onOpenTaskOption = (i: number) => {
    if (taskOption === i) setTaskOption(-1)
    else setTaskOption(i)
  }

  useFetchUserBoards()
  useFetchBoardTasks(board.activeBoard.id)
  const { send } = UseWebSocket()

  return (
    <div className="flex min-h-[100%]">
      <BoardList boards={board.boards} activeBoard={board.activeBoard} />
      <div className="flex flex-col w-full py-4 px-6">
        <div className="h-16 w-full">
          <h3 className="font-bold text-xl">
            {board.activeBoard.project_name}
          </h3>
        </div>
        <div
          className={`flex items-start gap-8 flex-grow no-scrollbar overflow-auto h-[80vh] ${
            main.isSidebarOpen ? "w-[60vw] md:w-[75vw]" : "w-[72vw] md:w-[82vw]"
          }`}
        >
          {task.tasks.map((tk, i) => (
            <div key={i} className="bg-white p-4 rounded-md w-80 shadow-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold w-48">{tk.name}</h4>
                <div className="flex items-center gap-3 relative">
                  <HiPlus className="text-accent cursor-pointer" />
                  <SlOptions
                    className="cursor-pointer"
                    onClick={() => onOpenTaskOption(i)}
                  />
                  <div
                    className={`${
                      taskOption === i ? "" : "hidden"
                    } absolute top-[1.6rem] right-[0] z-10 bg-white rounded-lg shadow-sd w-44`}
                  >
                    <TaskOption
                      taskId={tk.id}
                      socketSend={send}
                      callback={() => setTaskOption(-1)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2 gap-2">
                {tk.tasks.map((item, i) => {
                  let color = tagColors[i % tagColors.length]
                  if (tagColorsHashMap[item.tag]) {
                    color = tagColorsHashMap[item.tag]
                  } else {
                    tagColorsHashMap[item.tag] = color
                  }

                  return <TaskItem key={i} item={item} tagColor={color} />
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const TaskOption = ({
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
