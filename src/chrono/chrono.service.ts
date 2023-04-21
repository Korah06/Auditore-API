import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChronoDto } from './dto/chrono.dto';
import { Chrono } from './interfaces/chrono.interface';

@Injectable()
export class ChronoService {
  constructor(@InjectModel('Chrono') private readonly chronoModel: Model<Chrono>) { }

  create(createChronoDto: CreateChronoDto) {
    const chrono = new this.chronoModel(createChronoDto)
    console.log('Modelo del chrono creado');
    return chrono.save()

  }

  async findAll(id: string): Promise<Chrono[]> {
    console.log('Cargando cronos...');
    const chronos = await this.chronoModel.find({ userId: id })

    console.log('Cronos Cargadas');
    return chronos;
  }

  findOne(id: number) {
    return `This action returns a #${id} chrono`;
  }

  update(id: number) {
    return `This action updates a #${id} chrono`;
  }

  async deleteChrono(id: string): Promise<Chrono> {
    const chrono = await this.chronoModel.findByIdAndDelete(id)
    return chrono
  }
}
