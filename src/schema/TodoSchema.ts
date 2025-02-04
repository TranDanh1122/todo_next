import { z } from "zod"
export const TodoSchema = z.object({
    title: z.string().min(1, { message: "You need to do some thing" })
})
export type TodoSchemaType = z.infer<typeof TodoSchema>