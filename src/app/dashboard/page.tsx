"use client"

import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { HiPlus } from "react-icons/hi"
import { SlOptions } from "react-icons/sl"
import { GoTrash } from "react-icons/go"
import { MdAdd } from "react-icons/md"
import { BiEditAlt } from "react-icons/bi"

import { AppContext } from "@/context"
import { useFetchUserBoards } from "@/hooks/boards/useFetchUserBoards"
import { useFetchBoardTasks } from "@/hooks/tasks/useFetchBoardTasks"
import { BoardList } from "./components/board-list"
import { TaskItem } from "./components/task-item"
import { sendMessage } from "@/hooks/websocket/useWebSocket"

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
  const { main, mainDispatch, board, task } = useContext(AppContext)
  const projectNameRef = useRef<HTMLInputElement | null>(null)
  const [taskOption, setTaskOption] = useState<number>(-1)
  const [projectName, setProjectName] = useState<string>("")

  const [isEditProjectName, setIsEditProjectName] = useState<boolean>(false)

  const onOpenTaskOption = (i: number) => {
    if (taskOption === i) setTaskOption(-1)
    else setTaskOption(i)
  }

  const handleEditProjectName = () => {
    setIsEditProjectName(true)
    projectNameRef.current?.focus()
  }

  const onChangeProjectName = (e: FormEvent) => {
    e.preventDefault()
    projectNameRef.current?.blur()
  }

  const handleBlurProjectName = () => {
    setIsEditProjectName(false)
    if (projectName === board.activeBoard.project_name) return
    if (!main.websocket) return
    sendMessage(main.websocket, "change_project_name", { name: projectName })
  }

  const onAddTask = () =>
    mainDispatch({
      type: "TOGGLE_MODAL",
      payload: { isOpen: true, title: "Add Task", type: "ADD_TASK" },
    })

  useFetchUserBoards()
  useFetchBoardTasks(board.activeBoard.id)

  useEffect(() => {
    setProjectName(board.activeBoard.project_name)
  }, [board.activeBoard.project_name])

  return (
    <div className="flex min-h-[100%]">
      <BoardList boards={board.boards} activeBoard={board.activeBoard} />
      <div className="flex flex-col w-full py-4 px-6">
        <div className="h-16 w-full flex items-start justify-between">
          <form
            className="flex items-center justify-start gap-2"
            onSubmit={onChangeProjectName}
          >
            <BiEditAlt
              className="text-xl cursor-pointer"
              onClick={handleEditProjectName}
            />
            <input
              ref={projectNameRef}
              className={`font-bold text-xl cursor-default w-auto ${
                isEditProjectName
                  ? "bg-white outline-accent"
                  : "bg-transparent outline-none"
              }`}
              value={projectName}
              readOnly={!isEditProjectName}
              onBlur={handleBlurProjectName}
              onChange={(e) => setProjectName(e.target.value)}
              onClick={handleEditProjectName}
            />
          </form>
          <button
            className="btn-primary flex items-center gap-2 text-sm"
            onClick={onAddTask}
          >
            Add Task <MdAdd className="text-2xl" />
          </button>
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
                      socketSend={(key: string, data: any) =>
                        main.websocket
                          ? sendMessage(main.websocket, key, data)
                          : {}
                      }
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
