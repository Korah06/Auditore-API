import {
    Controller, Post, Get, Put, Delete, Patch, Res,
    HttpStatus, Body, Query, Param, NotFoundException, Headers,
    NotAcceptableException,
    UseGuards
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/tasks.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getTasks(@Res() res) {
        const tasks = await this.tasksService.getTasks()

        if (tasks.length == 0) {
            throw new NotFoundException('Do not exist any task');
        }
        console.log('Enviando tareas...');

        console.log(tasks);
        return res.status(HttpStatus.OK).json({
            message: 'Tareas: ',
            tasks
        })
    }

    @Get('/single')
    async getTask(@Res() res, @Headers('id') id: string) {

        if (!id.match(/^[0-9a-fA-F]{24}$/)) { throw new NotAcceptableException('The id format is not correct') }

        const task = await this.tasksService.getTask(id)
        if (!task) { throw new NotFoundException('Task does not exist'); }

        console.log('Enviando tarea...');

        console.log(task);
        return res.status(HttpStatus.OK).json({
            message: 'Tarea: ',
            task
        })
    }

    @Post('/')
    async createTask(@Res() res, @Body() createTaskDTO: CreateTaskDto) {

        const task = await this.tasksService.createTask(createTaskDTO)
        console.log(task);

        return res.status(HttpStatus.OK).json({
            message: 'Tarea creada: ',
            task
        })
    }

    @Put('/')
    async modifyTask(@Res() res, @Body() createTaskDTO: CreateTaskDto, @Headers('id') id: string) {

        if (!id.match(/^[0-9a-fA-F]{24}$/)) { throw new NotAcceptableException('The id format is not correct') }

        const modified = await this.tasksService.modifyTask(createTaskDTO, id)
        if (!modified) { throw new NotFoundException('Task does not exist'); }

        console.log('Modificando tarea ', id);

        return res.status(HttpStatus.OK).json({
            message: 'Tarea modificada: ',
            modified
        })
    }

    @Delete('/')
    async deleteTask(@Res() res, @Headers('id') id: string) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) { throw new NotAcceptableException('The id format is not correct') }
        const deleted = await this.tasksService.deleteTask(id)
        if (!deleted) { throw new NotFoundException('Task does not exist'); }

        return res.status(HttpStatus.OK).json({
            message: 'Tarea eliminada: ',
            deleted
        })

    }
}
