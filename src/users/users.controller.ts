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

    @UseGuards(JwtAuthGuard)
    @Get('allusers')
    async getUsers(@Res() res, @Request() req) {
        let users;
        if (req.user.rol == "admin") {
            users = await this.usersService.getUsers()
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: "No se encuentra autorizado para esta peticion"
            })
        }
        return res.status(HttpStatus.OK).json({
            message: 'usuario: ',
            users
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('myrole')
    async getRole(@Res() res, @Request() req) {

        let role;
        console.log(req.user.rol);

        if (req.user.rol == "admin") { role = true } else { role = false }
        console.log(role);


        return res.status(HttpStatus.OK).json({
            message: 'role: ',
            role
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/')
    async deleteTask(@Res() res, @Headers('id') id: string) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) { throw new NotAcceptableException('The id format is not correct') }
        const deleted = await this.usersService.deleteUser(id)
        if (!deleted) { throw new NotFoundException('Task does not exist'); }

        return res.status(HttpStatus.OK).json({
            message: 'Usuario eliminado: ',
            deleted
        })
    }

    @Put('/')
    async modifyUser(@Res() res, @Body() createUserDTO: CreateUserDto, @Headers('id') id: string) {

        console.log(createUserDTO);


        if (!id.match(/^[0-9a-fA-F]{24}$/)) { throw new NotAcceptableException('The id format is not correct') }

        const modified = await this.usersService.modifyUser(createUserDTO, id)
        if (!modified) { throw new NotFoundException('Task does not exist'); }

        console.log(modified);

        console.log('Modificando usuario ', id);

        return res.status(HttpStatus.OK).json({
            message: 'Tarea modificada: ',
            modified
        })
    }
}
