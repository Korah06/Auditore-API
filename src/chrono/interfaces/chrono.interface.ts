import { Document } from "mongoose";

export interface Chrono extends Document {
    readonly name: string
    readonly minutes: number
    readonly restMinutes: number
    readonly categoryId: string
    readonly userId: string
    readonly IsPomodoro: boolean
}
