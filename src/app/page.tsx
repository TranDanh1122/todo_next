'use client'
import Image from "next/image";
import React from "react";
import clsx from "clsx";
import TodoForm from "@/components/TodoForm";
import { useTheme } from "./hooks/useTheme";
export default function Home(): React.JSX.Element {
  const { theme, setTheme } = useTheme()
  return (
    <main
      className={clsx("w-full h-full min-h-screen bg-no-repeat bg-top bg-fixed bg-contain", {
        "bg-mobile-light md:bg-desk-light": theme == "light",
        "bg-mobile-dark md:bg-desk-dark": theme == "dark",
      })}>
      <div className="container mx-auto h-full w-1/2">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[2.5rem] tracking-[1rem] text-white">TODO</h1>
          <i onClick={() => setTheme(theme == "light" ? "dark" : "light ")} className="w-6 h-6 block bg-white" style={{
            mask: `url("/assets/images/${theme == "light" ? "icon-moon.svg" : "icon-sun.svg"}") center/cover no-repeat`,
            WebkitMask: `url("/assets/images/${theme == "light" ? "icon-moon.svg" : "icon-sun.svg"}") center/cover no-repeat`
          }}></i>
        </div>
        <TodoForm />
      </div>
    </main >
  )
}
