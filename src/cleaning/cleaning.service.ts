import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clean } from './clean.entity';

interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
}

@Injectable()
export class CleaningService {
  constructor(
    @InjectRepository(Clean)
    private cleanRepo: Repository<Clean>,
  ) {}

  async findAll(options: FindAllOptions) {
    const { page, limit, search } = options;

    const query = this.cleanRepo.createQueryBuilder('clean');

    // Busca case-insensitive em múltiplos campos
    if (search) {
      query.andWhere('clean.name ILIKE :search', { search: `%${search}%` });
    }

    // Paginação e ordenação
    query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('clean.updatedAt', 'DESC');

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
    return this.cleanRepo.findOne({ where: { id } });
  }

  async create(data: Partial<Clean>) {
    const clean = this.cleanRepo.create(data);
    return this.cleanRepo.save(clean);
  }

  async update(id: number, data: Partial<Clean>) {
    const clean = await this.findOne(id);
    if (!clean) throw new NotFoundException('clean not found');
    Object.assign(clean, data);
    return this.cleanRepo.save(clean);
  }

  async remove(id: number) {
    const clean = await this.findOne(id);
    if (!clean) throw new NotFoundException('clean not found');
    return this.cleanRepo.remove(clean);
  }
}
