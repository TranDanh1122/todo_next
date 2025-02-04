import React from "react"
import { createTodo, deleteTodo, fetchData, toogleTodo } from "@/redux/slicers/TodoSlicer";
import { AppDispatch, AppState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
export const useTodo = () => {
    console.log("useTodo re-run!");
    const dispatch: AppDispatch = useDispatch()
    const { todos, loading } = useSelector((state: AppState) => state.todo)
    React.useEffect(() => {
        console.log("Fetching data...");
        dispatch(fetchData())
    }, [])
    return { dispatch, deleteTodo, createTodo, toogleTodo, todos, loading }
}