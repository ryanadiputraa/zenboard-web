"use client"

import { AppContext } from "@/context"
import { ReactNode, useContext } from "react"

export function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  const { main } = useContext(AppContext)

  return (
    <main
      className={`w-screen h-screen ${main.isSidebarOpen ? "pl-64" : "pl-16"}`}
    >
      {children}
    </main>
  )
}
