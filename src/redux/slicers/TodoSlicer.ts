'use client'
import { TodoSchemaType } from "@/schema/TodoSchema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTodo as create, updateTodo, deleteTodo as remove, getTodos, deletes } from "@/app/actions/todoAction";
export interface Todo extends TodoSchemaType {
    id?: string,
    isComplete?: boolean,
}
interface state {
    todos: Todo[],
    loading: boolean,
    filter?: Record<string, unknown>
}
export const createTodo = createAsyncThunk("todo/create", async (todo: TodoSchemaType, { rejectWithValue }) => {
    try {
        console.log("create todo");

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
export const fetchData = createAsyncThunk("todo/fecth", async (filter: Record<string, unknown> | null, { rejectWithValue }) => {
    try {
        console.log("fetchData is running...");
        return await getTodos(filter)
    } catch (error) {
        rejectWithValue(error)
    }
})
export const deleteTodos = createAsyncThunk("todo/deletes", async (query: Record<string, unknown>, { rejectWithValue }) => {
    try {
        return await deletes(query)
    } catch (error) {
        rejectWithValue(error)
    }
})
const todoSlicer = createSlice({
    name: "slicer/todo",
    initialState: {
        todos: [],
        loading: true,
    } as state,
    reducers: {
        setFilter: (state: state, action: PayloadAction<Record<string, unknown> | undefined>) => {
            state.filter = action.payload
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
            state.loading = true
        }).addCase(fetchData.fulfilled, (state: state, action: PayloadAction<Todo[] | undefined>) => {
            if (action.payload) {
                state.loading = false
                state.todos = action.payload || []
            }
        }).addCase(fetchData.rejected, (state: state, action: PayloadAction<unknown>) => {
            console.error(action.payload)
            state.loading = false
        }).addCase(deleteTodos.pending, (state: state) => {
            state.loading = true
        }).addCase(deleteTodos.fulfilled, (state: state, action: PayloadAction<unknown | undefined>) => {
            if (action.payload) {
                state.loading = false
                state.todos = state.todos.filter(todo => !todo.isComplete)
            }
        })
    }
})
export const { setFilter } = todoSlicer.actions
export default todoSlicer.reducer