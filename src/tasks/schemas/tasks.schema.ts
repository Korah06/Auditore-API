import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";

export type TasksDocument = Tasks & Document;

@Schema()
export class Tasks {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    description: string;
    @Prop({ required: false, default: Date.now() })
    startDate: Date;
    @Prop({ required: true, default: Date.now() })
    endDate: Date;
    @Prop({ required: true })
    categoryId: string;
    @Prop({ required: true })
    userId: string;
    @Prop({ required: true, default: false })
    completed: boolean;
}
export const TasksSchema = SchemaFactory.createForClass(Tasks)