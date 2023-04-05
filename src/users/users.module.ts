import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UsersSchema }
    ])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
