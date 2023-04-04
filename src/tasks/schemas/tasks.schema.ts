import { Schema } from "mongoose";

//Esquema de las tareas
export const TasksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    categoryId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
})

