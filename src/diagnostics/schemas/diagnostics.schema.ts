import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";

export type DiagnosticsDocument = Diagnostics & Document;

@Schema()
export class Diagnostics {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    workMinutes: number;
    @Prop({ required: true })
    restMinutes: number;
    @Prop({ required: true })
    repeats: number;
    @Prop({ required: true })
    idCategory: string;
    @Prop({ required: true })
    idUser: string;
    @Prop({ required: true, })
    tasksId: string[];
}
export const DiagnosticsSchema = SchemaFactory.createForClass(Diagnostics)