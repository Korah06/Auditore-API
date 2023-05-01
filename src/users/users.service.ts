import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/users.interface';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async createUser(createUserDTO: CreateUserDto): Promise<User> {
        const user = new this.userModel(createUserDTO)
        console.log('Modelo del usuario creado');
        return await user.save()
    }
    async getUser(id: string): Promise<User> {
        return await this.userModel.findById(id)
    }
}
