import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './schemas/categories.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema }
    ])
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule { }
