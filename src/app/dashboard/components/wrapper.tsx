"use client"

import { AppContext } from "@/context"
import { ReactNode, useContext } from "react"

import { Header } from "./header"

export function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  const { main } = useContext(AppContext)

  return (
    <main
      className={`w-screen h-screen overflow-x-hidden bg-white ${
        main.isSidebarOpen ? "sm:pl-48" : "sm:pl-16"
      }`}
    >
      <Header />
      {children}
    </main>
  )
}
