"use client"

import Image from "next/image"
import { useContext } from "react"
import { BsPersonCircle } from "react-icons/bs"
import { RxHamburgerMenu } from "react-icons/rx"

import { AppContext } from "@/context"

export function Header(): JSX.Element {
  const { main, mainDispatch, user } = useContext(AppContext)
  const { userInfo } = user

  return (
    <header className="flex justify-between items-center px-4 py-3 border-b-2 border-gray-300 shadow-md">
      <div className="capitalize font-bold">
        {main.activeDashboardPage.label}
      </div>
      <div className="flexrc">
        <div className="hidden sm:flex items-center gap-3">
          {userInfo.picture ? (
            <Image
              className="rounded-full cursor-pointer"
              src={userInfo.picture}
              width={40}
              height={40}
              alt=""
            />
          ) : (
            <BsPersonCircle className="text-3xl cursor-pointer" />
          )}
          <div className="flex flex-col justify-between text-xs">
            <h4 className="font-bold">
              {userInfo.first_name + userInfo.last_name}
            </h4>
            <span className="text-grey">{userInfo.email}</span>
          </div>
        </div>
        <button
          className="sm:hidden text-2xl"
          onClick={() => mainDispatch({ type: "TOGGLE_SIDEBAR" })}
        >
          <RxHamburgerMenu />
        </button>
      </div>
    </header>
  )
}
