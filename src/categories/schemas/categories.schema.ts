import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";


export type CategoriesDocument = Categories & Document;

@Schema()
export class Categories {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    color: string;
    @Prop({ required: true })
    userId: string;
}
export const CategorySchema = SchemaFactory.createForClass(Categories)