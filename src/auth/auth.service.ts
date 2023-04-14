import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from 'src/users/schemas/users.schema';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    private jwtAuthService: JwtService
  ) { }

  async register(registerAuthDto: RegisterAuthDto) {
    const { password, email } = registerAuthDto

    const findUser = await this.userModel.findOne({ email })

    if (findUser) { throw new NotAcceptableException }

    //EL 8 son los salt rounds
    const plainToHash = await hash(password, 8)

    registerAuthDto = { ...registerAuthDto, password: plainToHash };
    return this.userModel.create(registerAuthDto)
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto
    const findUser = await this.userModel.findOne({ email })
    if (!findUser) { throw new NotFoundException }

    const checkPassword = await compare(password, findUser.password)

    if (!checkPassword) { throw new ForbiddenException }

    const payload = { id: findUser._id, email: findUser.email, rol: findUser.rol }
    const token = await this.jwtAuthService.signAsync(payload)

    token
    return token
  }
}
