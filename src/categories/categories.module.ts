import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './schemas/categories.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChronoSchema } from 'src/chrono/schema/chrono.schema';
import { TasksSchema } from 'src/tasks/schemas/tasks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'Chrono', schema: ChronoSchema },
      { name: 'Task', schema: TasksSchema }
    ])
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule { }
