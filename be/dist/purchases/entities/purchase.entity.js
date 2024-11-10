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
exports.PurchaseEntity = void 0;
const product_entity_1 = require("../../products/entities/product.entity");
const sale_entity_1 = require("../../sales/entities/sale.entity");
const typeorm_1 = require("typeorm");
let PurchaseEntity = class PurchaseEntity {
};
exports.PurchaseEntity = PurchaseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PurchaseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PurchaseEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_entity_1.SaleEntity, (sale) => sale.purchases),
    __metadata("design:type", Number)
], PurchaseEntity.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (product) => product.purchase),
    __metadata("design:type", Array)
], PurchaseEntity.prototype, "products", void 0);
exports.PurchaseEntity = PurchaseEntity = __decorate([
    (0, typeorm_1.Entity)('purchases')
], PurchaseEntity);
//# sourceMappingURL=purchase.entity.js.map