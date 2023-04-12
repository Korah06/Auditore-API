import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }


}
