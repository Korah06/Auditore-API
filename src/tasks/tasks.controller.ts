import {
    Controller, Post, Get, Put, Delete, Patch, Res,
    HttpStatus, Body, Query, Param, NotFoundException,
    NotAcceptableException
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get('/')
    async getProducts(@Res() res) {
        const tasks = await this.tasksService.getTasks()
        console.log('Enviando tareas...');

        if (tasks.length == 0) {
            throw new NotFoundException('Do not exist any task');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Tareas: ',
            tasks
        })
    }
}
