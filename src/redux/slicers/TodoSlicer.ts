'use client'
import { TodoSchemaType } from "@/schema/TodoSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Todo extends TodoSchemaType {
    id?: string,
    isComplete?: boolean
}

const todoSlicer = createSlice({
    name: "slicer/todo",
    initialState: [],
    reducers: {
        createTodo: (state: Todo[], action: PayloadAction<TodoSchemaType>) => {
            state.push(action.payload)
        },
        toogleTodo: (state: Todo[], action: PayloadAction<string>) => {
            state = state.map(todo => {
                if (todo.id == action.payload) return { ...todo, isComplete: !todo.isComplete }
                return todo
            })
        },
        deleteTodo: (state: Todo[], action: PayloadAction<string>) => {
            state = state.filter(todo => todo.id !== action.payload)
        }
    }
})
export const { createTodo, toogleTodo, deleteTodo } = todoSlicer.actions
export default todoSlicer.reducer