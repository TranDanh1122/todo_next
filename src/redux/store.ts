import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./slicers/TodoSlicer"
export const store = configureStore({
    reducer: {
        todo: TodoReducer
    }
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch