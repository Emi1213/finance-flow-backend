import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  create(@Body() createIncomeDto: CreateIncomeDto) {
    return this.incomesService.create(createIncomeDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.incomesService.findAll(+userId);
  }

  @Get(':userId/:year/:month')
  getIncomeByUserId(
    @Param('year') year: string,
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.incomesService.getIncomeByUserId(+year, +userId, +month);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomesService.update(+id, updateIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomesService.remove(+id);
  }

  @Get('report/:userId/:year/:month')
  getReportByCategory(
    @Param('year') year: string,
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.incomesService.getReportByCtegory(+year, +userId, +month);
  }
}
