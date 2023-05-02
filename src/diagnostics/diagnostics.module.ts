import { Module } from '@nestjs/common';
import { DiagnosticsService } from './diagnostics.service';
import { DiagnosticsController } from './diagnostics.controller';
import { DiagnosticsSchema } from './schemas/diagnostics.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Diagnostic', schema: DiagnosticsSchema }
    ])
  ],
  controllers: [DiagnosticsController],
  providers: [DiagnosticsService]
})
export class DiagnosticsModule { }
