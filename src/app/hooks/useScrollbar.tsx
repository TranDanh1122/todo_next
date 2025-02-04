import React from "react"
import { Todo } from "../../redux/slicers/TodoSlicer";
export const useScrollbar = (todo: Todo[]) => {
    const ref = React.useRef({
        header: React.createRef<HTMLDivElement>(),
        create: React.createRef<HTMLFormElement>(),
        list: React.createRef<HTMLDivElement>(),
    })
    React.useLayoutEffect(() => {
        if (ref.current.list.current) ref.current.list.current.style.maxHeight = "none"
    }, [])
    const setScroll = () => {
        const formHeight = ref.current.create.current?.getBoundingClientRect().height ?? 0
        const headerHeight = ref.current.header.current?.getBoundingClientRect().height ?? 0
        const availableHeight = window.innerHeight - formHeight - headerHeight - 160 - 64
        if (ref.current.list.current) {
            const listHeight = ref.current.list.current.getBoundingClientRect().height
            if (listHeight > availableHeight) {
                ref.current.list.current.classList.remove("scrollbar-none", "overflow-y-hidden")
                ref.current.list.current.classList.add("scrollbar-thin", "overflow-y-scroll")
                ref.current.list.current.style.maxHeight = `${availableHeight}px`
            } else {
                ref.current.list.current.classList.add("scrollbar-none", "overflow-y-hidden")
                ref.current.list.current.classList.remove("scrollbar-thin", "overflow-y-scroll")
            }
        }
    }
    React.useEffect(() => {
        setScroll()
    }, [todo])
    React.useEffect(() => {
        window.addEventListener("resize", setScroll)
        return () => { window.removeEventListener("resize", setScroll) }
    })
    return { ref }
}