'use client'
import Image from "next/image";
import React from "react";
import clsx from "clsx";
import TodoForm from "@/components/TodoForm";
import { useTheme } from "./hooks/useTheme";
import { useTodo } from "./hooks/useTodo";
import { Todo } from "@/redux/slicers/TodoSlicer";
export default function Home(): React.JSX.Element {
  const { theme, setTheme } = useTheme()
  const { todo } = useTodo()
  return (
    <main
      className={clsx("w-full h-full min-h-screen bg-no-repeat bg-top bg-fixed bg-contain py-20", {
        "bg-mobile-light md:bg-desk-light": theme == "light",
        "bg-mobile-dark md:bg-desk-dark": theme == "dark",
      })}>
      <div className="container mx-auto h-full min-h-screen md:w-1/2">
        <div className="flex items-center justify-between mb-10 ">
          <h1 className="font-bold text-[2.5rem] tracking-[1rem] text-white">TODO</h1>
          <i onClick={() => setTheme(theme == "light" ? "dark" : "light ")} className="w-6 h-6 block bg-white" style={{
            mask: `url("/assets/images/${theme == "light" ? "icon-moon.svg" : "icon-sun.svg"}") center/cover no-repeat`,
            WebkitMask: `url("/assets/images/${theme == "light" ? "icon-moon.svg" : "icon-sun.svg"}") center/cover no-repeat`
          }}></i>
        </div>
        <TodoForm />
        <div className="bg-white rounded-lg mt-6">
          {
            todo.map((el: Todo) => <TodoForm key={el.id} todo={el} />)
          }
        </div>

      </div>
    </main >
  )
}
