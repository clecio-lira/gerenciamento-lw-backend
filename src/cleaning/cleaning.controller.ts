import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CleaningService } from './cleaning.service';

@Controller('cleaning')
@UseGuards(JwtAuthGuard) // protege todas as rotas
export class CleaningController {
  constructor(private readonly cleaningService: CleaningService) {}

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    return this.cleaningService.findAll({
      page: pageNumber,
      limit: pageSize,
      search,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cleaningService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.cleaningService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.cleaningService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cleaningService.remove(id);
  }
}
