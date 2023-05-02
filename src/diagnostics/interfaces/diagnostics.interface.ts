import { Document } from "mongoose";

export interface Diagnostic extends Document {
    readonly workMinutes: number
    readonly restMinutes: number
    readonly repeats: number
    readonly idCategory: string
    readonly idUser: string
    readonly tasksId: string[]
}
