import {
    Controller, Post, Get, Put, Delete, Patch, Res,
    HttpStatus, Body, Query, Param, NotFoundException, Headers,
    NotAcceptableException,
    UseGuards,
    Request
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }


    //PARA TRABAJAR CON LOS ROLES ES MEDIANTE EL @Request
    //Se deberá de comprobar el req.user.rol si es del rol admin para que pueda realizar o no diferentes cuestiones
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getTasks(@Res() res, @Request() req) {

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

    @UseGuards(JwtAuthGuard)
    @Get('/mytasks')
    async getUserTasks(@Res() res, @Request() req) {

        const tasks = await this.tasksService.getMyTasks(req.user.userId)

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

    @UseGuards(JwtAuthGuard)
    @Get('/mytasksCategory')
    async getUserCatTasks(@Res() res, @Request() req, @Headers('id') id: string) {

        const tasks = await this.tasksService.getMyCatTasks(req.user.userId, id)

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

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createTask(@Res() res, @Body() createTaskDTO: CreateTaskDto, @Request() req) {

        console.log(createTaskDTO);
        const newTask: CreateTaskDto = {
            categoryId: createTaskDTO.categoryId,
            description: createTaskDTO.description,
            name: createTaskDTO.name,
            userId: req.user.userId,
            endDate: createTaskDTO.endDate,
            startDate: createTaskDTO.startDate,
            completed: false
        }

        const task = await this.tasksService.createTask(newTask)
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

    @UseGuards(JwtAuthGuard)
    @Put('/updatetasks')
    async modifyListOfTasks(@Res() res, @Body() updateTaskDTO: UpdateTaskDto[]) {


        const modified = await this.tasksService.modifyTasks(updateTaskDTO,)

        console.log('Modificando tareas');

        return res.status(HttpStatus.OK).json({
            message: 'Tareas modificadas: ',
            modified
        })
    }

    @UseGuards(JwtAuthGuard)
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
