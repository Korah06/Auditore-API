import { Document } from "mongoose";

export interface Task extends Document {
    readonly name: string
    readonly description: string
    readonly startDate: Date
    readonly endDate: Date
    readonly categoryId: string
    readonly userId: string
}