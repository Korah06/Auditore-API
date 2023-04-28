import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";


export type ChronosDocument = Chronos & Document;

@Schema()
export class Chronos {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    userId: string;
    @Prop({ required: true })
    categoryId: string;
    @Prop({ required: true })
    minutes: number;
    @Prop({ required: false })
    restMinutes: number;
    @Prop({ required: true })
    IsPomodoro: boolean;
}
export const ChronoSchema = SchemaFactory.createForClass(Chronos)