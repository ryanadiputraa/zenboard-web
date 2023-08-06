"use client"

import { SlOptions } from "react-icons/sl"
import { Draggable } from "react-beautiful-dnd"

import { TaskItem } from "@/data/task"

interface Props {
  item: TaskItem
  index: number
  tagColor: string
}

export function TaskItem({ item, index, tagColor }: Props): JSX.Element {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col text-sm gap-2 p-3 border-grey border-[0.05rem] rounded-md cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <span
              style={{ backgroundColor: tagColor }}
              className="text-xs font-semibold text-white py-1 px-3 rounded-full"
            >
              {item.tag}
            </span>
            <SlOptions />
          </div>
          <div className="line-clamp-3">
            <p>{item.description}</p>
          </div>
        </div>
      )}
    </Draggable>
  )
}
