"use client"

import { ReactNode, useContext } from "react"

import { AppContext } from "@/context"
import { useFetchUserInfo } from "@/hooks/user/useFetchUserInfo"
import { useActiveDashboardPage } from "@/hooks/core/useActiveDashboardPage"
import { Header } from "./header"
import { Modal } from "@/app/components/modal"
import Toast from "@/app/components/toast"
import { UseWebSocket } from "@/hooks/websocket/useWebSocket"

export function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  const { main } = useContext(AppContext)

  useFetchUserInfo()
  useActiveDashboardPage()
  UseWebSocket()

  return (
    <main
      className={`w-screen h-screen flex flex-col overflow-x-hidden bg-white transition-all duration-150 ${
        main.isSidebarOpen ? "sm:pl-40" : "sm:pl-16"
      }`}
    >
      <Header />
      <div className="bg-grey-light flex-grow">{children}</div>
      <Modal />
      <Toast />
    </main>
  )
}
