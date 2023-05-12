import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDiagnosticDto } from './dto/diagnostic.dto';
import { Diagnostic } from './interfaces/diagnostics.interface';
import { Model } from 'mongoose';

@Injectable()
export class DiagnosticsService {
  constructor(@InjectModel('Diagnostic') private readonly diagnosticModel: Model<Diagnostic>) { }

  async create(createDiagnosticDto: CreateDiagnosticDto) {
    return await this.diagnosticModel.create(createDiagnosticDto);
  }

  async getDiagnostics(id: string) {
    const diagnostics = await this.diagnosticModel.find({ idUser: id })

    return diagnostics
  }

}
