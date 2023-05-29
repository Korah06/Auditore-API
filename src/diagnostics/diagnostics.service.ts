import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDiagnosticDto } from './dto/diagnostic.dto';
import { Diagnostic } from './interfaces/diagnostics.interface';
import { Model } from 'mongoose';
import { Diagnostics } from './schemas/diagnostics.schema';

@Injectable()
export class DiagnosticsService {
  constructor(@InjectModel('Diagnostic') private readonly diagnosticModel: Model<Diagnostic>) { }

  async create(createDiagnosticDto: CreateDiagnosticDto, id: string) {


    const nuevoDiagnostic = new this.diagnosticModel({
      name: createDiagnosticDto.name,
      workMinutes: createDiagnosticDto.workMinutes,
      restMinutes: createDiagnosticDto.restMinutes,
      repeats: createDiagnosticDto.repeats,
      idCategory: createDiagnosticDto.idCategory,
      idUser: createDiagnosticDto.idUser,
      tasksId: createDiagnosticDto.tasksId,
    });

    const diagnosticGuardado = await nuevoDiagnostic.save();
    console.log(diagnosticGuardado);

    return diagnosticGuardado;

  }

  async getDiagnostics(id: string) {
    const diagnostics = await this.diagnosticModel.find({ idUser: id })

    return diagnostics
  }

  async getSingleDiagnostic(id: string): Promise<Diagnostic> {
    const diagnostic = await this.diagnosticModel.findById(id)
    console.log(diagnostic);
    return diagnostic
  }
}
