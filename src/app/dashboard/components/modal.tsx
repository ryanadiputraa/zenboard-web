"use client"

import { useContext } from "react"
import { AiOutlineClose } from "react-icons/ai"

import { AppContext } from "@/context"

export const Modal = (): JSX.Element => {
  const { main, mainDispatch } = useContext(AppContext)

  const onClose = () => {
    mainDispatch({ type: "TOGGLE_MODAL", payload: {} })
    if (main.modal.onClose) main.modal.onClose()
  }

  const onConfirm = () => {
    if (main.modal.onConfirm) main.modal.onConfirm()
  }

  const ModalContent = (): JSX.Element => {
    switch (main.modal.type) {
      case "Confirm":
        return <Confirm />

      default:
        return <></>
    }
  }

  return (
    <div
      id="defaultModal"
      aria-hidden="true"
      className={`${
        main.modal.isOpen ? "" : "hidden"
      } bg-primary/80 grid place-items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overscroll-y-auto md:inset-0 h-full`}
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              {main.modal.title}
            </h3>
            <AiOutlineClose
              className="text-2xl cursor-pointer"
              onClick={onClose}
            />
          </div>
          <ModalContent />
        </div>
      </div>
    </div>
  )
}

const Confirm = (): JSX.Element => {
  return <></>
}
