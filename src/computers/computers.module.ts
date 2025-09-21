import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputersService } from './computers.service';
import { ComputersController } from './computers.controller';
import { Computer } from './computer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Computer])],
  providers: [ComputersService],
  controllers: [ComputersController],
})
export class ComputersModule {}
