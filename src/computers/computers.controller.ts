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
import { ComputersService } from './computers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('computers')
@UseGuards(JwtAuthGuard) // protege todas as rotas
export class ComputersController {
  constructor(private readonly computersService: ComputersService) {}

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
    @Query('locality') locality?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    return this.computersService.findAll({
      page: pageNumber,
      limit: pageSize,
      search,
      locality,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.computersService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.computersService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.computersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.computersService.remove(id);
  }
}
