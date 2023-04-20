import { Module } from '@nestjs/common';
import { ChronoService } from './chrono.service';
import { ChronoController } from './chrono.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChronoSchema } from './schema/chrono.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Chrono', schema: ChronoSchema }
    ])
  ],
  controllers: [ChronoController],
  providers: [ChronoService]
})
export class ChronoModule { }
