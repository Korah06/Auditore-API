import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksSchema } from './schemas/tasks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TasksSchema }
    ])
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule { }
