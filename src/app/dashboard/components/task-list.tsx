"use client"

import { useContext, useState } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { HiPlus } from "react-icons/hi"
import { SlOptions } from "react-icons/sl"

import { Task } from "@/data/task"
import { TaskItem } from "../components/task-item"
import { TaskOption } from "../components/task-option"
import { AppContext } from "@/context"
import { sendMessage } from "@/hooks/websocket/useWebSocket"

const tagColors = [
  "#EB455F",
  "#F49D1A",
  "#19376D",
  "#42855B",
  "#635985",
  "#19A7CE",
  "#57C5B6",
]

const tagColorsHashMap: { [key: string]: string } = {}

interface Props {
  task: Task
  index: number
}

export const TaskList = ({ task, index }: Props): JSX.Element => {
  const { main } = useContext(AppContext)
  const [taskOption, setTaskOption] = useState<number>(-1)

  const onOpenTaskOption = (i: number) => {
    if (taskOption === i) setTaskOption(-1)
    else setTaskOption(i)
  }

  return (
    <Draggable key={task.id} index={index} draggableId={task.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 rounded-md w-80 shadow-lg ${
            snapshot.isDragging ? "bg-accent/70" : "bg-white"
          }`}
        >
          <Droppable key={task.id} droppableId={task.id}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold w-48">{task.name}</h4>
                  <div className="flex items-center gap-3 relative">
                    <HiPlus className="text-accent cursor-pointer" />
                    <SlOptions
                      className="cursor-pointer"
                      onClick={() => onOpenTaskOption(index)}
                    />
                    <div
                      className={`${
                        taskOption === index ? "" : "hidden"
                      } absolute top-[1.6rem] right-[0] z-10 bg-white rounded-lg shadow-sd w-44`}
                    >
                      <TaskOption
                        taskId={task.id}
                        socketSend={(key: string, data: any) =>
                          main.websocket
                            ? sendMessage(main.websocket, key, data)
                            : {}
                        }
                        callback={() => setTaskOption(-1)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-2 gap-2">
                  {task.tasks.map((item, i) => {
                    let color = tagColors[i % tagColors.length]
                    if (tagColorsHashMap[item.tag]) {
                      color = tagColorsHashMap[item.tag]
                    } else {
                      tagColorsHashMap[item.tag] = color
                    }

                    return (
                      <TaskItem
                        key={item.id}
                        item={item}
                        index={i}
                        tagColor={color}
                      />
                    )
                  })}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
