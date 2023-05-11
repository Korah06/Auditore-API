import {
  Controller, Post, Get, Put, Delete, Patch, Res,
  HttpStatus, Body, Query, Param, NotFoundException, Headers,
  NotAcceptableException, Request,
  UseGuards
} from '@nestjs/common';
import { DiagnosticsService } from './diagnostics.service';
import { CreateDiagnosticDto } from './dto/diagnostic.dto';

@Controller('diagnostics')
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: DiagnosticsService) { }

  @Post('/create')
  create(@Res() res, @Body() createDiagnosticDto: CreateDiagnosticDto) {
    console.log("----------------------HOLA--------------------------");

    console.log(createDiagnosticDto);

    const created = this.diagnosticsService.create(createDiagnosticDto);
    return res.status(HttpStatus.OK).json({
      message: 'Diagnostico creado: ',
      created
    })
  }

  @Get()
  findAll() {
    // return this.diagnosticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.diagnosticsService.findOne(+id);
  }
}
