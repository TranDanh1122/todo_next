import { ThemeContext } from "@/context/ThemeContext"
import React from "react"

export const useTheme = () => {
    const { theme, setTheme } = React.useContext(ThemeContext)
    return { theme, setTheme }
}