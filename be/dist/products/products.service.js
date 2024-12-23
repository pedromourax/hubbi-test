"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
let ProductsService = ProductsService_1 = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.logger = new common_1.Logger(ProductsService_1.name);
    }
    async findAll() {
        return await this.productRepository.find();
    }
    async findOne(id) {
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            return product;
        }
        catch (error) {
            this.logger.log(error.message);
            throw error;
        }
    }
    async create(createProduct) {
        return await this.productRepository.save(createProduct);
    }
    async createMany(products) {
        return await this.productRepository.save(products);
    }
    async delete(id) {
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            await this.productRepository.remove(product);
            return { message: 'Product deleted successfully' };
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async deleteMany(ids) {
        try {
            const products = await this.productRepository.findByIds(ids);
            if (products.length === 0) {
                throw new common_1.NotFoundException('No products found for the given ids');
            }
            await this.productRepository.remove(products);
            return { message: 'Products deleted successfully' };
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async update(id, updateProduct) {
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            const updatedProduct = await this.productRepository.save({
                ...product,
                ...updateProduct,
            });
            return updatedProduct;
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = ProductsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map