import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/categories.interface';
import { CreateCategoryDto } from './dto/categories.dto.';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async getCategories(): Promise<Category[]> {
        console.log('Cargando tareas...');
        const categories = await this.categoryModel.find()
        console.log('Categorias Cargadas');
        return categories
    }

    async getUserCategories(id: string): Promise<Category[]> {
        console.log('Cargando tareas...');
        const categories = await this.categoryModel.find({ userId: id })
        console.log('Categorias Cargadas');
        return categories
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new this.categoryModel(createCategoryDto)
        console.log('Modelo de la categoria creado');
        return await category.save()
    }

    async deleteCategory(id: string): Promise<Category> {
        const category = await this.categoryModel.findByIdAndDelete(id)
        return category
    }
}
