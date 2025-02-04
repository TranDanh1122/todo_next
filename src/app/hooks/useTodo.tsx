import { createTodo, deleteTodo, toogleTodo } from "@/redux/slicers/TodoSlicer";
import { AppDispatch, AppState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
export const useTodo = () => {
    const dispatch: AppDispatch = useDispatch()
    const { todos } = useSelector((state: AppState) => state.todo)
    return { dispatch, deleteTodo, createTodo, toogleTodo, todos }
}