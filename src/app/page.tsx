'use client'
import React from "react";
import clsx from "clsx";
import TodoForm from "@/components/TodoForm";
import { useTheme } from "./hooks/useTheme";
import { useTodo } from "./hooks/useTodo";
import { useScrollbar } from "./hooks/useScrollbar"
import { TodoSchemaType } from "@/schema/TodoSchema";
import TodoList from "@/components/TodoList";
export default function Home(): React.JSX.Element {
  const { theme, setTheme } = useTheme()
  const { todos, loading, dispatch, toogleTodo, createTodo, deleteTodo, fetchData, filter, setFilter, deleteTodos } = useTodo()
  const { ref } = useScrollbar(todos)
  console.log("Home re-render", filter);

  return (<>

    <main
      className={clsx("w-full h-full min-h-screen  bg-no-repeat bg-top bg-fixed bg-contain py-20", {
        "bg-mobile-light md:bg-desk-light": theme == "light",
        "bg-mobile-dark md:bg-desk-dark bg-[#171823]": theme == "dark",
      })}>
      <div className="container mx-auto h-full md:w-1/2">
        <div ref={ref.current.header} className="flex items-center justify-between mb-10 ">
          <h1 className="font-bold text-[2.5rem] tracking-[1rem] text-white">TODO</h1>
          <i onClick={() => setTheme(theme == "light" ? "dark" : "light")} className="w-6 h-6 block bg-white" style={{
            mask: `url("/assets/images/${theme == "light" ? "icon-moon.svg" : "icon-sun.svg"}") center/cover no-repeat`,
            WebkitMask: `url("/assets/images/${theme == "light" ? "icon-moon.svg" : "icon-sun.svg"}") center/cover no-repeat`
          }}></i>
        </div>
        <TodoForm ref={ref.current.create} onCreate={(data: TodoSchemaType) => { dispatch(createTodo(data)) }} />
        <TodoList ref={ref.current.list} todos={todos}
          onDelete={(id: string) => dispatch(deleteTodo(id))} loading={loading}
          toogleTodo={({ id, isComplete }: { id: string, isComplete: boolean }) => dispatch(toogleTodo({ id, isComplete }))} />
        <div ref={ref.current.footer} className={clsx("flex px-6 py-4 w-full md:justify-between justify-center items-center md:text-[0.875rem] text-[.75rem] tracking-[-0.2px] font-bold capitalize", {
          "text-[#5B5E7E] bg-[#25273D]": theme == "dark",
          "text-[#9495A5] bg-white": theme == "light"
        })}>
          <span className=" gap-1 items-center hidden md:flex"><span>{todos.length}</span>items left</span>
          <ul className="flex items-center justify-start  gap-5 ">
            <li onClick={() => {
              dispatch(setFilter())
              dispatch(fetchData(null))
            }} className={!filter ? "text-[#3A7CFD]" : ""}><a href="#">all</a></li>
            <li onClick={() => {
              dispatch(setFilter({ isComplete: false }))
              dispatch(fetchData({ isComplete: false }))
            }} className={filter?.isComplete === false ? "text-[#3A7CFD]" : ""}><a href="#">active</a></li>
            <li onClick={() => {
              dispatch(setFilter({ isComplete: true }))
              dispatch(fetchData({ isComplete: true }))
            }} className={filter?.isComplete === true ? "text-[#3A7CFD]" : ""}><a href="#">completed</a></li>
          </ul>
          <span onClick={() => dispatch(deleteTodos({ isComplete: true }))} className="cursor-pointer hidden md:block" >clear completed</span>
        </div>
      </div>
    </main >
  </>
  )
}
