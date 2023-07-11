"use client"

import { useContext } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"

import { AppContext } from "@/context"
import { Board } from "@/data/board"
import { format } from "date-fns"

interface Props {
  boards: Board[]
  activeBoard: Board
}

export function BoardList({ boards, activeBoard }: Props): JSX.Element {
  const { boardDispatch } = useContext(AppContext)

  return (
    <div className="w-40 bg-white border-r-2 border-grey-light text-xs">
      {boards.map((board) => (
        <div
          key={board.id}
          className={`flex justify-between items-center py-4 pl-5 pr-1 cursor-pointer border-b-2 border-b-grey-light hover:bg-accent hover:bg-opacity-10 ${
            board.id === activeBoard.id
              ? "bg-accent bg-opacity-30 border-r-4 border-r-accent hover:bg-accent hover:bg-opacity-30"
              : ""
          }`}
          onClick={() =>
            boardDispatch({ type: "SET_ACTIVE_BOARD", board: board })
          }
        >
          <div>
            <h4 className="font-bold">{board.project_name}</h4>
            <span className="text-grey">
              {format(new Date(board.created_at), "MMM do, yyyy")}
            </span>
          </div>
          <MdKeyboardArrowRight className="text-2xl" />
        </div>
      ))}
    </div>
  )
}
