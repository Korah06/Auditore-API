import {
  Controller, Post, Get, Put, Delete, Patch, Res,
  HttpStatus, Body, Query, Param, NotFoundException, Headers,
  NotAcceptableException, Request,
  UseGuards
} from '@nestjs/common';
import { DiagnosticsService } from './diagnostics.service';
import { CreateDiagnosticDto } from './dto/diagnostic.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('diagnostics')
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: DiagnosticsService) { }

  @Post('/create')
  create(@Res() res, @Body() createDiagnosticDto: CreateDiagnosticDto) {

    console.log(createDiagnosticDto);

    const created = this.diagnosticsService.create(createDiagnosticDto);
    return res.status(HttpStatus.OK).json({
      message: 'Diagnostico creado: ',
      created
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll(@Res() res, @Request() req) {

    const diagnostics = await this.diagnosticsService.getDiagnostics(req.user.userId);

    return res.status(HttpStatus.OK).json({
      message: 'Diagnosticos: ',
      diagnostics
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.diagnosticsService.findOne(+id);
  }
}
