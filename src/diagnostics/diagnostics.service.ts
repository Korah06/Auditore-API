import { Injectable } from '@nestjs/common';
import { CreateDiagnosticDto } from './dto/diagnostic.dto';

@Injectable()
export class DiagnosticsService {
  create(createDiagnosticDto: CreateDiagnosticDto) {
    return 'This action adds a new diagnostic';
  }

  findAll() {
    return `This action returns all diagnostics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diagnostic`;
  }


  remove(id: number) {
    return `This action removes a #${id} diagnostic`;
  }
}
