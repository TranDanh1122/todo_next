import { Todo } from "@/redux/slicers/TodoSlicer";
import React from "react";
import TodoForm from "./TodoForm";
import { useTheme } from "@/app/hooks/useTheme";
import clsx from "clsx";
interface Props {
    todos: Todo[],
    toogleTodo?: ({ id, isComplete }: { id: string, isComplete: boolean }) => void,
    onDelete?: (id: string) => void,
    loading: boolean
}
const TodoList = React.forwardRef<HTMLDivElement, Props>(({ todos, toogleTodo, onDelete, loading }, ref): React.JSX.Element => {
    const { theme } = useTheme()
    return <div className="relative">
        {loading && <div className="flex h-screen w-full items-center justify-center absolute z-10 top-0 left-0 bg-white/70">
            <div className="loader"></div>
        </div>}
        <div ref={ref} className={clsx("rounded-lg mt-6 shadow-2xl", {
            "bg-[#25273D]": theme == "dark",
            "bg-white ": theme == "light"
        })}>
            {todos.map((el: Todo) => <TodoForm key={el.id} todo={el}
                onDelete={(id: string) => onDelete?.(id)}
                toogleTodo={({ id, isComplete }: { id: string, isComplete: boolean }) => toogleTodo?.({ id, isComplete })} />)}
        </div>
    </div>
})
TodoList.displayName = "TodoList"
export default TodoList