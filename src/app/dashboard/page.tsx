"use client"

import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { MdAdd } from "react-icons/md"
import { BiEditAlt } from "react-icons/bi"
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd"

import { AppContext } from "@/context"
import { useFetchUserBoards } from "@/hooks/boards/useFetchUserBoards"
import { useFetchBoardTasks } from "@/hooks/tasks/useFetchBoardTasks"
import { BoardList } from "./components/board-list"
import { sendMessage } from "@/hooks/websocket/useWebSocket"
import { TaskList } from "./components/task-list"

export default function Dashboard(): JSX.Element {
  const { main, mainDispatch, board, task, taskDispatch } =
    useContext(AppContext)
  const projectNameRef = useRef<HTMLInputElement | null>(null)
  const [projectName, setProjectName] = useState<string>("")

  const [isEditProjectName, setIsEditProjectName] = useState<boolean>(false)

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

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    if (type === "group") {
      taskDispatch({
        type: "REORDER_TASKS",
        destinationIdx: destination.index ?? 0,
        sourceIdx: source.index,
      })
      return
    }

    taskDispatch({
      type: "REORDER_TASK_ITEMS",
      source: source,
      destination: destination,
    })
  }

  // TODO: call api to update task order and task items

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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="ROOT" type="group" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex items-start gap-8 flex-grow no-scrollbar overflow-auto h-[80vh] ${
                  main.isSidebarOpen
                    ? "w-[60vw] md:w-[75vw]"
                    : "w-[72vw] md:w-[82vw]"
                }`}
              >
                {task.tasks.map((tk, i) => (
                  <TaskList task={tk} index={i} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}
