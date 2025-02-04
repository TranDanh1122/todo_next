'use client'
import React from "react";
import clsx from "clsx";
import TodoForm from "@/components/TodoForm";
import { useTheme } from "./hooks/useTheme";
import { useTodo } from "./hooks/useTodo";
import { Todo } from "@/redux/slicers/TodoSlicer";
import { useScrollbar } from "./hooks/useScrollbar"
export default function Home(): React.JSX.Element {
  const { theme, setTheme } = useTheme()
  const { todos } = useTodo()
  const { ref } = useScrollbar(todos)
  return (
    <main
      className={clsx("w-full h-full min-h-screen bg-no-repeat bg-top bg-fixed bg-contain py-20", {
        "bg-mobile-light md:bg-desk-light": theme == "light",
        "bg-mobile-dark md:bg-desk-dark": theme == "dark",
      })}>
      <div className="container mx-auto h-full md:w-1/2">
        <div ref={ref.current.header} className="flex items-center justify-between mb-10 ">
          <h1 className="font-bold text-[2.5rem] tracking-[1rem] text-white">TODO</h1>
          <i onClick={() => setTheme(theme == "light" ? "dark" : "light ")} className="w-6 h-6 block bg-white" style={{
            mask: `url("/assets/images/${theme == "light" ? "icon-moon.svg" : "icon-sun.svg"}") center/cover no-repeat`,
            WebkitMask: `url("/assets/images/${theme == "light" ? "icon-moon.svg" : "icon-sun.svg"}") center/cover no-repeat`
          }}></i>
        </div>
        <TodoForm ref={ref.current.create} />
        <div ref={ref.current.list} className="bg-white rounded-lg mt-6">
          {
            todos.map((el: Todo) => <TodoForm key={el.id} todo={el} />)
          }
        </div>

      </div>
    </main >
  )
}
