import { Document } from "mongoose";

export interface Chrono extends Document {
    readonly name: string
    readonly minutes: number
    readonly categoryId: string
    readonly userId: string
}
