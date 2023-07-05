"use client"

import { ReactNode } from "react"

import { AppProvider } from "@/context"
import { SideNav } from "./components/side-nav"
import { Wrapper } from "./components/wrapper"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <AppProvider>
      <SideNav />
      <Wrapper>{children}</Wrapper>
    </AppProvider>
  )
}
