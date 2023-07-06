"use client"

import { AppContext } from "@/context"
import { useContext } from "react"

export default function Dashboard(): JSX.Element {
  const { main } = useContext(AppContext)

  return <div className="px-4 py-2 bg-grey-light h-full">Dashboard</div>
}
