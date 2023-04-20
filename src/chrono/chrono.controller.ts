import {
  Controller, Post, Get, Put, Delete, Patch, Res,
  HttpStatus, Body, Query, Param, NotFoundException, Headers,
  NotAcceptableException, Request, UseGuards
} from '@nestjs/common';
import { ChronoService } from './chrono.service';
import { CreateChronoDto } from './dto/chrono.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chrono')
export class ChronoController {
  constructor(private readonly chronoService: ChronoService) { }

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async create(@Res() res, @Body() createChronoDto: CreateChronoDto, @Request() req) {

    const newChrono: CreateChronoDto = {
      name: createChronoDto.name,
      categoryId: createChronoDto.categoryId,
      minutes: createChronoDto.minutes,
      userId: req.user.userId
    }

    const chrono = this.chronoService.create(newChrono);
    const id = (await chrono)._id

    return res.status(HttpStatus.OK).json({
      message: 'Chrono creado: ',
      id
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get("/")
  async findAll(@Res() res, @Request() req) {

    const chronos = await this.chronoService.findAll(req.user.userId)
    console.log(chronos);

    return res.status(HttpStatus.OK).json({
      message: 'Chrono creado: ',
      chronos
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chronoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,) {
    return this.chronoService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chronoService.remove(+id);
  }
}
