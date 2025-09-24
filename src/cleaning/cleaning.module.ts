import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clean } from './clean.entity';
import { CleaningService } from './cleaning.service';
import { CleaningController } from './cleaning.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clean])],
  providers: [CleaningService],
  controllers: [CleaningController],
})
export class CleaningModule {}
