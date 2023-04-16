export class CreateTaskDto {
    readonly name: string
    readonly description: string
    readonly startDate?: Date
    readonly endDate: Date
    readonly categoryId: string
    readonly userId: string
    readonly completed: boolean
}

export class UpdateTaskDto {
    readonly _id: string
    readonly name: string
    readonly description: string
    readonly startDate?: Date
    readonly endDate: Date
    readonly categoryId: string
    readonly userId: string
    readonly completed: boolean
    readonly __v: number
}