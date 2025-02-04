'use server'
import { Todo } from "@/redux/slicers/TodoSlicer"
import { TodoSchemaType } from "@/schema/TodoSchema"
import { PrismaClient } from "@prisma/client"
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient()
export const getTodos = async () => {
    return await prisma.todo.findMany()
}

export const createTodo = async (data: TodoSchemaType) => {
    return await prisma.todo.create({ data: data })
}

export const updateTodo = async (id: string, data: Partial<Todo>) => {
    return await prisma.todo.update({
        where: { id: id },
        data: data
    })
}
export const deleteTodo = async (id: string) => {
    return await prisma.todo.delete({
        where: { id: id }
    })
}