import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private logger = new Logger(ProductsService.name);

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) throw new NotFoundException('Product not found');
      return product;
    } catch (error) {
      this.logger.log(error.message);
      throw error;
    }
  }

  async create(createProduct: CreateProductDto) {
    return await this.productRepository.save(createProduct);
  }

  async createMany(products: CreateProductDto[]) {
    return await this.productRepository.save(products);
  }

  // Start Generation Here
  async delete(id: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      await this.productRepository.remove(product);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async deleteMany(ids: number[]) {
    try {
      const products = await this.productRepository.findByIds(ids);
      if (products.length === 0) {
        throw new NotFoundException('No products found for the given ids');
      }
      await this.productRepository.remove(products);
      return { message: 'Products deleted successfully' };
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async update(id: number, updateProduct: Partial<ProductEntity>) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const updatedProduct = await this.productRepository.save({
        ...product,
        ...updateProduct,
      });

      return updatedProduct;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
