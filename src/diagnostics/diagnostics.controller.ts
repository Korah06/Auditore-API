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

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Res() res, @Body() createDiagnosticDto: CreateDiagnosticDto, @Request() req) {

    const created = await this.diagnosticsService.create(createDiagnosticDto, req.user.userId);

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

  @Get('/single')
  async getDiagnostic(@Res() res, @Headers('id') id: string) {

    console.log(id);

    if (!id.match(/^[0-9a-fA-F]{24}$/)) { throw new NotAcceptableException('The id format is not correct') }

    const diagnostic = await this.diagnosticsService.getSingleDiagnostic(id)
    if (!diagnostic) { throw new NotFoundException('diagnostic does not exist'); }

    console.log('Enviando diagnostico...');

    console.log(diagnostic);
    return res.status(HttpStatus.OK).json({
      message: 'diagnostic: ',
      diagnostic
    })
  }
}
