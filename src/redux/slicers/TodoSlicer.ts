'use client'
import { TodoSchemaType } from "@/schema/TodoSchema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTodo as create, updateTodo, deleteTodo as remove, getTodos } from "@/app/actions/todoAction";
export interface Todo extends TodoSchemaType {
    id?: string,
    isComplete?: boolean
}
interface state {
    todos: Todo[],
    loading: boolean
}
export const createTodo = createAsyncThunk("todo/create", async (todo: TodoSchemaType, { rejectWithValue }) => {
    try {
        return await create(todo)
    } catch (error) {
        rejectWithValue(error)
    }
})
export const toogleTodo = createAsyncThunk("todo/update", async (payload: { id: string, isComplete: boolean }, { rejectWithValue }) => {
    try {
        return await updateTodo(payload.id, { isComplete: payload.isComplete })
    } catch (error) {
        rejectWithValue(error)
    }
})
export const deleteTodo = createAsyncThunk("todo/delete", async (id: string, { rejectWithValue }) => {
    try {
        return await remove(id)
    } catch (error) {
        rejectWithValue(error)
    }
})
export const fetchData = createAsyncThunk("todo/fecth", async (_, { rejectWithValue }) => {
    try {
        return await getTodos()
    } catch (error) {
        rejectWithValue(error)
    }
})
const todoSlicer = createSlice({
    name: "slicer/todo",
    initialState: {
        todos: [],
        loading: false
    },
    reducers: {
        init: (state: state) => {
            const initData = async () => {
                try {
                    state.loading = true
                    const data = await getTodos()
                    state.todos = data
                    state.loading = false
                } catch (error) {
                    throw new Error(error as string)
                }
            }
            initData()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTodo.pending, (state: state) => {
            state.loading = true
        }).addCase(createTodo.fulfilled, (state: state, action: PayloadAction<Todo | undefined>) => {
            if (action.payload) {
                state.todos.push(action.payload)
                state.loading = false
            }
        }).addCase(toogleTodo.pending, (state: state) => {
            state.loading = true
        }).addCase(toogleTodo.fulfilled, (state: state, action: PayloadAction<Todo | undefined>) => {
            if (action.payload) {
                state.todos = state.todos.map(todo => {
                    if (todo.id == action.payload?.id) return { ...todo, isComplete: action.payload?.isComplete }
                    return todo
                })
                state.loading = false
            }
        }).addCase(deleteTodo.pending, (state: state) => {
            state.loading = true
        }).addCase(deleteTodo.fulfilled, (state: state, action: PayloadAction<Todo | undefined>) => {
            if (action.payload) {
                state.todos = state.todos.filter(todo => todo.id !== action.payload?.id)
                state.loading = false
            }
        }).addCase(fetchData.pending, (state: state) => {
            state.loading = false
        }).addCase(fetchData.fulfilled, (state: state, action: PayloadAction<Todo[] | undefined>) => {
            state.loading = false
            state.todos = action.payload || []
        })
    }
})
export default todoSlicer.reducer