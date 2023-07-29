"use client"

import { useContext } from "react"
import { HiPlus } from "react-icons/hi"
import { SlOptions } from "react-icons/sl"

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
            <div key={i} className="bg-white p-4 rounded-md w-80">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold w-48">{tk.name}</h4>
                <div className="flex items-center gap-3">
                  <HiPlus className="text-accent cursor-pointer" />
                  <SlOptions className="cursor-pointer" />
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
