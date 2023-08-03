"use client"

import { useContext, useEffect } from "react"
import { AiOutlineCheck, AiFillWarning, AiOutlineClose } from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"

import { AppContext } from "@/context"

export default function Toast() {
  const { main, mainDispatch } = useContext(AppContext)

  const onClose = () => mainDispatch({ type: "TOGGLE_TOAST", payload: {} })

  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      if (main.toast.isOpen) {
        mainDispatch({ type: "TOGGLE_TOAST", payload: {} })
      }
    }, 3000)
    return () => clearTimeout(toastTimeout)
  }, [main.toast.isOpen, mainDispatch])

  const ToastIcon = () => {
    switch (main.toast.type) {
      case "SUCCESS":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg bg-green-800 text-white">
            <AiOutlineCheck />
          </div>
        )

      case "ERROR":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-rose-600 text-white">
            <BiErrorCircle />
          </div>
        )

      case "WARNING":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-600 text-white">
            <AiFillWarning />
          </div>
        )

      default:
        return <></>
    }
  }

  return (
    <div
      className={`${
        main.toast.isOpen ? "flex" : "hidden"
      } items-center justify-between fixed bottom-2 right-2 w-full max-w-xs p-4 mb-4 text-white  rounded-lg shadow bg-gray-800`}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <ToastIcon />
        <span className="text-sm font-normal">{main.toast.msg}</span>
      </div>
      <AiOutlineClose className="text-2xl cursor-pointer" onClick={onClose} />
    </div>
  )
}
