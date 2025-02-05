import React from "react"
import { createTodo, deleteTodo, deleteTodos, fetchData, setFilter, toogleTodo } from "@/redux/slicers/TodoSlicer";
import { AppDispatch, AppState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
export const useTodo = () => {
    console.log("useTodo re-run!");
    const dispatch: AppDispatch = useDispatch()
    const { todos, loading, filter } = useSelector((state: AppState) => state.todo)
    React.useEffect(() => {
        if (todos.length <= 0) {
            console.log("Fetching data...");
            dispatch(fetchData(null))
        }
    }, [])
    return { dispatch, deleteTodo, createTodo, toogleTodo, todos, loading, filter, fetchData, setFilter, deleteTodos }
}