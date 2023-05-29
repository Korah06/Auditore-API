import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/categories.interface';
import { CreateCategoryDto } from './dto/categories.dto.';
import { Chrono } from 'src/chrono/interfaces/chrono.interface';
import { Task } from 'src/tasks/interfaces/tasks.interface';
import { ForbiddenException } from '@nestjs/common'

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
        @InjectModel('Chrono') private readonly chronoModel: Model<Chrono>,
        @InjectModel('Task') private readonly taskModel: Model<Task>) { }

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
        if (!category) {
            throw new NotFoundException('No se ha eliminado la categoria');
        }
        const tasks = await this.taskModel.find({ categoryId: id })
        const chronos = await this.chronoModel.find({ categoryId: id });
        tasks.map(async (t) => {
            let task;
            if (t.categoryId == id) {
                task = await this.taskModel.findByIdAndDelete(t.id)
            }
        })
        chronos.map(async (c) => {
            if (c.categoryId == id) { await this.chronoModel.findByIdAndDelete(c.id) }
        })
        return category
    }
}
