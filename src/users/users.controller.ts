import {
    Controller, Post, Get, Put, Delete, Patch, Res,
    HttpStatus, Body, Query, Param, NotFoundException, Headers,
    NotAcceptableException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('/')
    async createTask(@Res() res, @Body() createUserDTO: CreateUserDto) {

        const user = await this.usersService.createUser(createUserDTO)
        console.log(user);

        return res.status(HttpStatus.OK).json({
            message: 'usuario creado: ',
            user
        })
    }

}
