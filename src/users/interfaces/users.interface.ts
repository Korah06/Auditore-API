import { Document } from "mongoose";

export interface User extends Document {
    readonly username: string
    readonly name: string
    readonly surname: string
    readonly avatar: string
    readonly banner: string
    readonly email: string
    readonly password: string
}