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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const sales_service_1 = require("../sales/sales.service");
let PurchasesService = class PurchasesService {
    constructor(prisma, salesService) {
        this.prisma = prisma;
        this.salesService = salesService;
    }
    async create(createPurchaseDto) {
        const sale = await this.salesService.findOne(createPurchaseDto.saleId);
        if (!sale) {
            throw new common_1.BadRequestException('Sale not found');
        }
        const totalAmount = createPurchaseDto.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return this.prisma.purchase.create({
            data: {
                totalAmount,
                sale: { connect: { id: createPurchaseDto.saleId } },
                items: {
                    create: createPurchaseDto.items.map((item) => ({
                        quantity: item.quantity,
                        price: item.price,
                        product: { connect: { id: item.productId } },
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                sale: true,
            },
        });
    }
    async findAll() {
        return this.prisma.purchase.findMany({
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                sale: true,
            },
        });
    }
    async findOne(id) {
        return this.prisma.purchase.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                sale: {
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        sales_service_1.SalesService])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map