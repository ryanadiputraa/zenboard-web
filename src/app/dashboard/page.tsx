"use client"

import { useContext } from "react"

import { AppContext } from "@/context"
import { useFetchUserBoards } from "@/hooks/boards/useFetchUserBoards"

import { BoardList } from "./components/board-list"

export default function Dashboard(): JSX.Element {
  const { board } = useContext(AppContext)

  useFetchUserBoards()

  return (
    <div className="flex min-h-[100%]">
      <BoardList boards={board.boards} activeBoard={board.activeBoard} />
    </div>
  )
}
