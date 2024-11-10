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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const purchase_entity_1 = require("./entities/purchase.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../products/products.service");
const sales_service_1 = require("../sales/sales.service");
let PurchasesService = class PurchasesService {
    constructor(purchaseRepository, salesService, productsService) {
        this.purchaseRepository = purchaseRepository;
        this.salesService = salesService;
        this.productsService = productsService;
    }
    async create(createPurchase) {
        try {
            const sale = await this.salesService.findOne(createPurchase.sale);
            if (!sale) {
                throw new common_1.BadRequestException('Sale not found');
            }
            const selectedProducts = sale.products.filter((product) => createPurchase.products.some((p) => p.id === product.id));
            if (selectedProducts.length === 0) {
                throw new common_1.BadRequestException('No valid products selected');
            }
            const totalAmount = selectedProducts.reduce((acc, product) => acc + Number(product.price) * product.quantity, 0);
            const purchase = this.purchaseRepository.create({
                sale: sale.id,
                products: selectedProducts,
                totalAmount,
            });
            const savedPurchase = await this.purchaseRepository.save(purchase);
            await Promise.all(selectedProducts.map(async (product) => {
                product.purchase = savedPurchase;
                return this.productsService.update(product.id, product);
            }));
            return savedPurchase;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Error creating purchase');
        }
    }
    async findAll() {
        try {
            const purchase = await this.purchaseRepository.find({
                relations: {
                    products: true,
                },
            });
            if (!purchase) {
                throw new common_1.NotFoundException('Purchase not found');
            }
            return purchase;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Error fetching purchase');
        }
    }
    async findOne(id) {
        try {
            const purchase = await this.purchaseRepository.findOne({
                where: { id },
                relations: {
                    products: true,
                },
            });
            if (!purchase) {
                throw new common_1.NotFoundException('Purchase not found');
            }
            return purchase;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Error fetching purchase');
        }
    }
    async delete(id) {
        try {
            const purchase = await this.findOne(id);
            await Promise.all(purchase.products.map(async (product) => {
                product.purchase = null;
                return this.productsService.update(product.id, product);
            }));
            await this.purchaseRepository.remove(purchase);
            return { message: 'Purchase removed successfully' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Error removing purchase');
        }
    }
    async deleteMany(ids) {
        try {
            const purchases = await Promise.all(ids.map((id) => this.findOne(id)));
            await Promise.all(purchases.flatMap((purchase) => purchase.products.map(async (product) => {
                product.purchase = null;
                return this.productsService.update(product.id, product);
            })));
            await this.purchaseRepository.remove(purchases);
            return { message: 'Purchases removed successfully' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Error removing purchases');
        }
    }
    async getTotalAmountSum() {
        try {
            const purchases = await this.purchaseRepository.find();
            const totalSum = purchases.reduce((acc, purchase) => acc + Number(purchase.totalAmount), 0);
            return totalSum;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Error calculating total purchases');
        }
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_entity_1.PurchaseEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => sales_service_1.SalesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        sales_service_1.SalesService,
        products_service_1.ProductsService])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map