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
var SalesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sale_entity_1 = require("./entities/sale.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../products/products.service");
const purchases_service_1 = require("../purchases/purchases.service");
let SalesService = SalesService_1 = class SalesService {
    constructor(saleRepository, productsService, purchasesService) {
        this.saleRepository = saleRepository;
        this.productsService = productsService;
        this.purchasesService = purchasesService;
        this.logger = new common_1.Logger(SalesService_1.name);
    }
    async create(createSale) {
        const totalAmount = createSale.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        const sale = await this.saleRepository.save({
            customerName: createSale.customerName,
            status: createSale?.status,
            date: createSale.date,
            totalAmount,
        });
        const products = createSale.products.map((product) => ({
            ...product,
            sale: { id: sale.id },
        }));
        await this.productsService.createMany(products);
        return sale;
    }
    async findAll() {
        return await this.saleRepository.find({
            relations: {
                products: true,
                purchases: {
                    products: true,
                },
            },
            select: {
                id: true,
                customerName: true,
                totalAmount: true,
                date: true,
                status: true,
                products: true,
                purchases: {
                    id: true,
                    totalAmount: true,
                    products: true,
                },
            },
            order: {
                date: 'ASC',
            },
        });
    }
    async findOne(id) {
        try {
            const sale = await this.saleRepository.findOne({
                where: { id },
                relations: {
                    products: true,
                    purchases: {
                        products: true,
                    },
                },
                select: {
                    id: true,
                    customerName: true,
                    totalAmount: true,
                    status: true,
                    date: true,
                    products: true,
                    purchases: {
                        id: true,
                        totalAmount: true,
                        products: true,
                    },
                },
            });
            if (!sale)
                throw new common_1.NotFoundException('Sale not found');
            return sale;
        }
        catch (error) {
            this.logger.log(error.message);
            throw error;
        }
    }
    async updateStatus(id, status) {
        try {
            let sale = await this.saleRepository.findOne({ where: { id } });
            console.log(sale, id);
            if (!sale) {
                throw new common_1.NotFoundException('Sale not found');
            }
            sale.status = status;
            return await this.saleRepository.save(sale);
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async delete(id) {
        try {
            const sale = await this.findOne(id);
            if (sale.products.length > 0) {
                await this.productsService.deleteMany(sale?.products.map((product) => product.id));
            }
            if (sale.purchases.length > 0) {
                await this.purchasesService.deleteMany(sale?.purchases.map((purchase) => purchase.id));
            }
            await this.saleRepository.remove(sale);
            return { message: 'Sale deleted successfully' };
        }
        catch (error) {
            this.logger.error(error.message);
            throw error;
        }
    }
    async findLastThree() {
        return await this.saleRepository.find({
            relations: {
                products: true,
                purchases: {
                    products: true,
                },
            },
            select: {
                id: true,
                customerName: true,
                totalAmount: true,
                date: true,
                status: true,
                products: true,
                purchases: {
                    id: true,
                    totalAmount: true,
                    products: true,
                },
            },
            order: {
                date: 'DESC',
            },
            take: 3,
        });
    }
    async getTotalAmount() {
        try {
            const sales = await this.saleRepository.find({
                select: {
                    totalAmount: true,
                },
            });
            const totalSales = sales.reduce((acc, sale) => acc + +sale.totalAmount, 0);
            const totalPurchases = await this.purchasesService.getTotalAmountSum();
            return {
                sales: parseFloat(totalSales.toFixed(3)),
                purchases: parseFloat(totalPurchases.toFixed(3)),
            };
        }
        catch (error) {
            this.logger.error('Error calculating total sales:', error.message);
            throw error;
        }
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = SalesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sale_entity_1.SaleEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => products_service_1.ProductsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService,
        purchases_service_1.PurchasesService])
], SalesService);
//# sourceMappingURL=sales.service.js.map