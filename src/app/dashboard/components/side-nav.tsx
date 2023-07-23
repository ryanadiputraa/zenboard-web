"use client"

import Link from "next/link"
import { useContext, useState } from "react"
import { RiArrowLeftRightLine } from "react-icons/ri"

import { AppContext } from "@/context"
import { DashboardPage } from "@/context/reducer/main"

export function SideNav(): JSX.Element {
  const { main, mainDispatch } = useContext(AppContext)
  const [animateRotate, setAnimateRotate] = useState(false)

  const MenuBtn: React.FC<{ page: DashboardPage }> = ({ page }) => (
    <Link href={page.link}>
      <li
        className={`flex items-center text-xl gap-2 px-4 py-4 cursor-pointer hover:bg-primary-light ${
          !main.isSidebarOpen ? "sm:justify-center sm:py-2" : ""
        } ${
          main.activeDashboardPage.label === page.label
            ? "bg-primary-light font-montserrat-bold"
            : ""
        }`}
        onClick={() =>
          mainDispatch({
            type: "SET_ACTIVE_DASHBOARD_PAGE",
            payload: page,
          })
        }
      >
        {page.ico}{" "}
        <span
          className={`text-sm capitalize ${
            !main.isSidebarOpen ? "inline sm:hidden" : ""
          }`}
        >
          {page.label}
        </span>
      </li>
    </Link>
  )

  return (
    <nav
      className={`z-50 transition-all duration-150 bg-primary text-white fixed sm:left-0 top-0 min-h-screen flex flex-col gap-6 pt-6 ${
        main.isSidebarOpen
          ? "hidden sm:flex w-40 left-0 items-start"
          : "w-3/4 sm:w-16 left-[-100%] sm:right-auto items-start sm:items-center"
      }`}
    >
      <Link href="/" className="cursor-pointer sm:self-center">
        <h1
          className={`font-bold px-4 ${
            main.isSidebarOpen ? "text-2xl" : "text-[0.6rem]"
          }`}
        >
          Zenboard
        </h1>
      </Link>
      <button
        className={`bg-accent font-bold text-white w-7 h-7 hidden sm:grid place-items-center p-1 rounded-full self-end relative left-3 bottom-14 sm:bottom-auto shadow-xl hover:brightness-95 ${
          animateRotate ? "animate-rotate" : ""
        }`}
        onClick={() => {
          mainDispatch({ type: "TOGGLE_SIDEBAR" })
          setAnimateRotate(true)
        }}
        onAnimationEnd={() => setAnimateRotate(false)}
      >
        <RiArrowLeftRightLine className=" w-full h-full" />
      </button>
      <div className="flex flex-col justify-between flex-grow w-full text-md">
        <div
          className={`w-full flex flex-col ${
            main.isSidebarOpen ? "items-start" : "items-center"
          }`}
        >
          <span className="text-grey mb-4 text-sm px-4">Menu</span>
          <ul className="w-full flex flex-col gap-1">
            {Object.keys(main.dashboardPages).map((label, i) => {
              if (label === "settings") return
              return <MenuBtn key={i} page={main.dashboardPages[label]} />
            })}
          </ul>
        </div>
        <div className="w-full">
          <MenuBtn page={main.dashboardPages["settings"]} />
        </div>
      </div>
    </nav>
  )
}
