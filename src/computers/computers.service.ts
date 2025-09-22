import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Computer } from './computer.entity';

interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
  locality?: string;
}

@Injectable()
export class ComputersService {
  constructor(
    @InjectRepository(Computer)
    private computerRepo: Repository<Computer>,
  ) {}

  async findAll(options: FindAllOptions) {
    const { page, limit, search, locality } = options;

    const query = this.computerRepo.createQueryBuilder('computer');

    // Busca case-insensitive em múltiplos campos
    if (search) {
      query.andWhere(
        'computer.name ILIKE :search OR computer.secondname ILIKE :search OR computer.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    // Filtro por localidade
    if (locality) {
      query.andWhere('computer.locality ILIKE :locality', {
        locality: `%${locality}%`,
      });
    }

    // Paginação e ordenação
    query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('computer.updatedAt', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      size: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    return this.computerRepo.findOne({ where: { id } });
  }

  async create(data: Partial<Computer>) {
    const computer = this.computerRepo.create(data);
    return this.computerRepo.save(computer);
  }

  async update(id: number, data: Partial<Computer>) {
    const computer = await this.findOne(id);
    if (!computer) throw new NotFoundException('Computer not found');
    Object.assign(computer, data);
    return this.computerRepo.save(computer);
  }

  async remove(id: number) {
    const computer = await this.findOne(id);
    if (!computer) throw new NotFoundException('Computer not found');
    return this.computerRepo.remove(computer);
  }
}
