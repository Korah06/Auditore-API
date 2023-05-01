import {
    Controller, Post, Get, Put, Delete, Patch, Res,
    HttpStatus, Body, Query, Param, NotFoundException, Headers,
    NotAcceptableException, Request,
    UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('/')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDto) {

        const user = await this.usersService.createUser(createUserDTO)
        console.log(user);

        return res.status(HttpStatus.OK).json({
            message: 'usuario creado: ',
            user
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('myuser')
    async getUser(@Res() res, @Request() req) {
        const user = await this.usersService.getUser(req.user.userId)
        return res.status(HttpStatus.OK).json({
            message: 'usuario: ',
            user
        })
    }
}
