import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from 'src/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';
import { ChronoModule } from 'src/chrono/chrono.module';
import { DiagnosticsModule } from 'src/diagnostics/diagnostics.module';

@Module({
  imports: [TasksModule, ChronoModule, DiagnosticsModule,
    AuthModule, UsersModule, CategoriesModule, ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
