import { Document } from "mongoose";

export interface Diagnostic extends Document {
    readonly name: string
    readonly workMinutes: number
    readonly restMinutes: number
    readonly repeats: number
    readonly idCategory: string
    readonly idUser: string
    readonly tasksId: string[]
}
