"use client"

import { useContext, useEffect } from "react"

import { AppContext } from "@/context"
import { usePathname } from "next/navigation"

export const useActiveDashboardPage = () => {
  const { main, mainDispatch } = useContext(AppContext)
  const pathname = usePathname()

  useEffect(() => {
    const title = pathname.split("/").at(-1) ?? "Dashboard"
    mainDispatch({
      type: "SET_ACTIVE_DASHBOARD_PAGE",
      payload: main.dashboardPages[title] ?? main.activeDashboardPage,
    })
  }, [pathname]) // eslint-disable-line
}
