import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Patch,
  Delete,
  Logger,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleEntity } from './entities/sale.entity';

@Controller('api/v1/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  private logger = new Logger(SalesController.name);

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get('last')
  async findLastThree() {
    try {
      const totalAmount = await this.salesService.getTotalAmount();
      const lastThree = await this.salesService.findLastThree();
      return { ...totalAmount, lastThree };
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() payload: { status: SaleEntity['status'] },
  ) {
    return await this.salesService.updateStatus(+id, payload.status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.salesService.delete(+id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
