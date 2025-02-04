'use client'
import { useTodo } from "@/app/hooks/useTodo"
import { Todo } from "@/redux/slicers/TodoSlicer"
import { TodoSchema, TodoSchemaType } from "@/schema/TodoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import React from "react"
import { useForm } from "react-hook-form"
export default function TodoForm({ todo }: { todo?: Todo }): React.JSX.Element {
    const { dispatch, toogleTodo, createTodo, deleteTodo } = useTodo()
    const form = useForm<TodoSchemaType>({
        defaultValues: {
            title: ""
        },
        resolver: zodResolver(TodoSchema)
    })
    const onSubmit = async (data: TodoSchemaType, type: string) => {
        if (type == "toogle") {
            if (todo && todo.id) dispatch(toogleTodo(todo.id))
        } else {
            dispatch(createTodo(data))
        }
    }
    React.useEffect(() => {
        form.setValue("title", todo?.title ?? "")
    }, [])

    return <form onSubmit={form.handleSubmit((data) => onSubmit(data, todo ? "toogle" : "create"))} className="flex items-center justify-start gap-6 px-6 py-5 bg-white rounded-xl">
        <button type="submit" className={clsx("border-[1px] border-solid border-[#E3E4F1] w-6 h-6 rounded-full cursor-pointer", {
            "bg-gradient-to-br from-[#55DDFF] to-[#C058F3]": todo?.isComplete,
            "bg-white": !todo?.isComplete
        })}>
            <i className="block w-2 h-2 bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                style={{
                    mask: "url(./images/icon-checkk.svg) center / cover no-repeat",
                    WebkitMask: "url(./images/icon-check.svg) center/ cover no-repeat"
                }}>
            </i>
        </button>
        <input readOnly={!(!todo)} {...form.register("title")} name="title" type="text" placeholder="Create a new todo…" className="text-[1.125rem] tracking-[-0.25px] text-[#393A4B] placeholder:text-[#9495A5] w-full h-full outline-none cursor-pointer" />
        {todo &&
            <i onClick={() => { if (todo.id) dispatch(deleteTodo(todo.id)) }} className="cursor-pointer w-[1.125rem] h-[1.125rem] bg-[#979797]" style={{
                mask: "url(/assets/images/icon-cross.svg) center / cover no-repeat",
                WebkitMask: "url(/assets/images/icon-cross.svg) center / cover no-repeat",
            }}></i>
        }
    </form>
}