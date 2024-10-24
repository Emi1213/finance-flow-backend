import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: createExpenseDto,
    });
  }

  findAll() {
    return this.prisma.expense.findMany();
  }

  async getExpenseByUserId(year: number, userId: number, month: number) {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const result = await this.prisma.expense.aggregate({
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

  findOne(id: number) {
    return this.prisma.expense.findUnique({
      where: { id },
    });
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  remove(id: number) {
    const expense = this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new Error('Expense not found');
    }
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}