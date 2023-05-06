import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosticsService } from './diagnostics.service';
import { CreateDiagnosticDto } from './dto/diagnostic.dto';

@Controller('diagnostics')
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: DiagnosticsService) { }

  @Post()
  create(@Body() createDiagnosticDto: CreateDiagnosticDto) {
    return this.diagnosticsService.create(createDiagnosticDto);
  }

  @Get()
  findAll() {
    return this.diagnosticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosticsService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosticsService.remove(+id);
  }
}
