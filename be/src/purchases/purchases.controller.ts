import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('api/v1/purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}
  private logger = new Logger(PurchasesController.name);

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Get()
  findAll() {
    return this.purchasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasesService.findOne(+id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.purchasesService.delete(+id);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
