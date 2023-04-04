export class CreateTaskDto {
    readonly name: string
    readonly description: string
    readonly startDate?: Date
    readonly endDate: Date
    readonly categoryId: string
    readonly userId: string
}