import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";

export type UsersDocument = Users & Document;
@Schema()
export class Users {
    @Prop({ required: true })
    username: string;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    surname: string;
    @Prop({ required: true })
    avatar: string;
    @Prop({ required: true })
    banner: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true })
    rol: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users)