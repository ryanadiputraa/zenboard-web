"use client"

import { ReactNode, useContext } from "react"

import { AppContext } from "@/context"
import { Header } from "./header"
import { useFetchUserInfo } from "@/hooks/user/useFetchUserInfo"

export function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  const { main } = useContext(AppContext)

  useFetchUserInfo()

  return (
    <main
      className={`w-screen h-screen overflow-x-hidden bg-white ${
        main.isSidebarOpen ? "sm:pl-48" : "sm:pl-16"
      }`}
    >
      <Header />
      <div className="px-4 py-2 bg-grey-light min-h-[92%]">{children}</div>
    </main>
  )
}
