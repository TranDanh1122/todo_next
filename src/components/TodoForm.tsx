'use client'
import { TodoSchema, TodoSchemaType } from "@/schema/TodoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
export default function TodoForm(): React.JSX.Element {
    console.log("re-render");
    const form = useForm<TodoSchemaType>({
        defaultValues: {
            title: ""
        },
        resolver: zodResolver(TodoSchema)
    })
    const onSubmit = async (data: TodoSchemaType) => {
        console.log(data);

    }
    return <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-start gap-6 px-6 py-5 bg-white rounded-xl">
        <button type="submit" className="border-[1px] border-solid border-[#E3E4F1] w-6 h-6 rounded-full"></button>
        <input {...form.register("title")} name="title" type="text" placeholder="Create a new todo…" className="text-[1.125rem] tracking-[-0.25px] text-[#393A4B] placeholder:text-[#9495A5] w-full h-full outline-none" />
    </form>
}