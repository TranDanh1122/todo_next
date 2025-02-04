'use client'
import { useTheme } from "@/app/hooks/useTheme"
import { Todo } from "@/redux/slicers/TodoSlicer"
import { TodoSchema, TodoSchemaType } from "@/schema/TodoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import React from "react"
import { useForm } from "react-hook-form"
interface Props {
    todo?: Todo,
    toogleTodo?: ({ id, isComplete }: { id: string, isComplete: boolean }) => void,
    onCreate?: (data: TodoSchemaType) => void,
    onDelete?: (id: string) => void,
}
const TodoForm = React.forwardRef<HTMLFormElement, Props>(({ todo, toogleTodo, onCreate, onDelete }, ref): React.JSX.Element => {
    // const { dispatch, toogleTodo, createTodo, deleteTodo } = useTodo()
    const form = useForm<TodoSchemaType>({
        defaultValues: {
            title: ""
        },
        resolver: zodResolver(TodoSchema)
    })
    const onSubmit = async (data: TodoSchemaType, type: string) => {
        if (type == "toogle") {
            if (todo && todo.id) toogleTodo?.({ id: todo.id, isComplete: !todo.isComplete })
        } else {
            onCreate?.(data)
        }
    }
    React.useEffect(() => {
        form.setValue("title", todo?.title ?? "")
    }, [])
    const { theme } = useTheme()
    return <form ref={ref} onSubmit={form.handleSubmit((data) => onSubmit(data, todo ? "toogle" : "create"))} className={clsx("flex items-center justify-start gap-6 px-6 py-5 bg-white border-b-[1px] border-solid border-[#C8CBE7]", {
        "bg-[#25273D]": theme == "dark",
        "bg-white": theme == "light",
        "rounded-xl ": !todo
    })}>
        <button type="submit" className={clsx("border-[1px] border-solid border-[#E3E4F1] w-6 h-6 rounded-full cursor-pointer relative", {
            "bg-gradient-to-br from-[#55DDFF] to-[#C058F3]": todo?.isComplete,
            "bg-white": !todo?.isComplete && theme == "light",
            "bg-[#25273D]": !todo?.isComplete && theme == "dark"

        })}>
            {todo?.isComplete && <i className="block w-2 h-2 bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                style={{
                    mask: "url(./assets/images/icon-checkk.svg) center / cover no-repeat",
                    WebkitMask: "url(./assets/images/icon-check.svg) center/ cover no-repeat"
                }}>
            </i>}
        </button>
        <input readOnly={!(!todo)} {...form.register("title")} name="title" type="text" placeholder="Create a new todo…" className={clsx("text-[1.125rem] tracking-[-0.25px]  placeholder:text-[#9495A5] w-full h-full outline-none cursor-pointer", {
            "text-[#D1D2DA] line-through italic": todo?.isComplete && theme == "light",
            "text-[#4D5067] line-through italic": todo?.isComplete && theme == "dark",
            "text-[#393A4B]": !todo?.isComplete && theme == "light",
            "text-[#C8CBE7]": !todo?.isComplete && theme == "dark",
            "bg-[#25273D]": theme == "dark",
            "bg-white": theme == "light"
        })} />
        {todo &&
            <i onClick={() => { if (todo.id) onDelete?.(todo.id) }} className="cursor-pointer w-[1.125rem] h-[1.125rem] bg-[#979797]" style={{
                mask: "url(/assets/images/icon-cross.svg) center / cover no-repeat",
                WebkitMask: "url(/assets/images/icon-cross.svg) center / cover no-repeat",
            }}></i>
        }
    </form>
})
TodoForm.displayName = "TodoForm"
export default TodoForm