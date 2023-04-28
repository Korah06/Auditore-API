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

    console.log(createChronoDto);

    const newChrono: CreateChronoDto = {
      name: createChronoDto.name,
      categoryId: createChronoDto.categoryId,
      minutes: createChronoDto.minutes,
      userId: req.user.userId,
      restMinutes: createChronoDto.restMinutes,
      IsPomodoro: createChronoDto.IsPomodoro
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

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  async remove(@Headers('id') id: string, @Request() req, @Res() res) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { throw new NotAcceptableException('The id format is not correct') }
    const deleted = await this.chronoService.deleteChrono(id)
    if (!deleted) { throw new NotFoundException('Category does not exist'); }

    return res.status(HttpStatus.OK).json({
      message: 'Cronometro eliminado: ',
      deleted
    })

  }
}
