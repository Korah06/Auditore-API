import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/tasks.interface';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

    async getTasks(): Promise<Task[]> {
        console.log('Cargando tareas...');
        const tasks = await this.taskModel.find()
        console.log('Tareas Cargadas');
        return tasks
    }

    async getMyTasks(id: string): Promise<Task[]> {
        console.log('Cargando tareas...');
        const tasks = await this.taskModel.find({ userId: id })
        console.log('Tareas Cargadas');
        return tasks
    }

    async getMyCatTasks(id: string, catId: string): Promise<Task[]> {
        console.log('Cargando tareas...');
        const tasks = await this.taskModel.find({ userId: id, categoryId: catId })
        console.log('Tareas Cargadas');
        return tasks
    }

    async getTask(id: string): Promise<Task> {
        return await this.taskModel.findById(id)
    }

    async createTask(createTaskDTO: CreateTaskDto): Promise<Task> {
        const task = new this.taskModel(createTaskDTO)
        console.log('Modelo de la tarea creado');
        console.log(task);

        return await task.save()
    }

    async modifyTask(createTaskDTO: CreateTaskDto, id: string): Promise<Task> {
        const task = this.taskModel.findByIdAndUpdate(id, createTaskDTO, { new: true });
        return task
    }
    async modifyTasks(updateTaskDTO: UpdateTaskDto[]) {
        // const task = this.taskModel.findByIdAndUpdate(id, createTaskDTO, { new: true });
        updateTaskDTO.forEach(async task => {
            const { name, categoryId, description, endDate, userId, startDate, __v, completed } = task
            console.log(task)
            const updated = await this.taskModel.findByIdAndUpdate(task._id,
                { name, categoryId, description, endDate, userId, startDate, __v, completed }, { new: true }
            )
            console.log(updated, "TAREA UPDATEADA");
        });

        // const tasks = await this.taskModel.updateMany(createTaskDTO);

    }

    async deleteTask(id: string): Promise<Task> {
        const task = await this.taskModel.findByIdAndDelete(id)
        return task
    }
}
