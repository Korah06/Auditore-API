import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async registerUser(@Res() res, @Body() userObject: RegisterAuthDto) {
    console.log(userObject);

    const user = await this.authService.register(userObject)

    return res.status(HttpStatus.OK).json({
      message: 'usuario registrado: ',
      user
    })
  }

  @Post('login')
  async loginUser(@Res() res, @Body() userObject: LoginAuthDto) {

    const token = await this.authService.login(userObject)


    return res.status(HttpStatus.OK).json({
      message: 'usuario logueado: ',
      token
    })
  }
}
