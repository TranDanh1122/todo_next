'use client'
import React from "react";
export const ThemeContext = React.createContext<{ theme: string, setTheme: React.Dispatch<React.SetStateAction<string>> }>({ theme: "", setTheme: () => { } })
export default function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
    const [theme, setTheme] = React.useState<string>("light")
    React.useEffect(() => {
        localStorage.setItem("todo_app_theme", theme)
    }, [theme])
    React.useLayoutEffect(() => {
        const localTheme = localStorage.getItem("todo_app_theme");
        if (localTheme) setTheme(localTheme); //không lấy trực tiếp tránh lỗi khi ssr
    }, []);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}