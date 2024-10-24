import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IncomesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createIncomeDto: CreateIncomeDto) {
    return this.prisma.income.create({
      data: createIncomeDto,
    });
  }

  async getIncomeByUserId(year: number, userId: number, month: number) {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const result = await this.prisma.income.aggregate({
      _sum: {
        value: true,
      },
      where: {
        userId,
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    });

    return {
      totalValue: result._sum.value,
      startDate: startOfMonth,
      endDate: endOfMonth,
    };
  }

  findAll() {
    return this.prisma.income.findMany();
  }

  findOne(id: number) {
    const income = this.prisma.income.findUnique({
      where: { id },
    });

    if (!income) {
      throw new Error('Income not found');
    }
    return this.prisma.income.findUnique({
      where: { id },
    });
  }

  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    const income = this.prisma.income.findUnique({
      where: { id },
    });

    if (!income) {
      throw new Error('Income not found');
    }

    return this.prisma.income.update({
      where: { id },
      data: updateIncomeDto,
    });
  }

  remove(id: number) {
    const income = this.prisma.income.findUnique({
      where: { id },
    });

    if (!income) {
      throw new Error('Income not found');
    }

    return this.prisma.income.delete({
      where: { id },
    });
  }
}