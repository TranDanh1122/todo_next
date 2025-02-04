'use client'
import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./slicers/TodoSlicer"
export const store = configureStore({
    reducer: {
        todo: TodoReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Tắt kiểm tra serializable
        }),
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch