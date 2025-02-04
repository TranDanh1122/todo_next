import { createTodo, deleteTodo, toogleTodo } from "@/redux/slicers/TodoSlicer";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
export const useTodo = () => {
    const dispatch: AppDispatch = useDispatch()
    return { dispatch, deleteTodo, createTodo, toogleTodo }
}