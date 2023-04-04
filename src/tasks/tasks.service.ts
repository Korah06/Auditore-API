import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/tasks.interface';
import { CreateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

    async getTasks(): Promise<Task[]> {
        console.log('Cargando tareas...');
        const tasks = await this.taskModel.find()
        console.log('Tareas Cargadas');
        return tasks
    }

    async getTask(id: string): Promise<Task> {
        return await this.taskModel.findById(id)
    }

    async createTask(createTaskDTO: CreateTaskDto): Promise<Task> {
        const task = new this.taskModel(createTaskDTO)
        console.log('Modelo de la tarea creado');
        return await task.save()
    }
}
