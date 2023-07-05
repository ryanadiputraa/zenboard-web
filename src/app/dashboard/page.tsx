"use client"

import { AppContext } from "@/context"
import { useContext } from "react"

export default function Dashboard(): JSX.Element {
  const { main } = useContext(AppContext)

  return <div>Dashboard</div>
}
