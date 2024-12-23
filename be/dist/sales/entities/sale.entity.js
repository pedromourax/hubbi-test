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
exports.SaleStatus = exports.SaleEntity = void 0;
const product_entity_1 = require("../../products/entities/product.entity");
const purchase_entity_1 = require("../../purchases/entities/purchase.entity");
const typeorm_1 = require("typeorm");
let SaleEntity = class SaleEntity {
};
exports.SaleEntity = SaleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SaleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SaleEntity.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SaleEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], SaleEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'PENDING' }),
    __metadata("design:type", String)
], SaleEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (products) => products.sale),
    __metadata("design:type", Array)
], SaleEntity.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchase_entity_1.PurchaseEntity, (purchase) => purchase.sale),
    __metadata("design:type", Array)
], SaleEntity.prototype, "purchases", void 0);
exports.SaleEntity = SaleEntity = __decorate([
    (0, typeorm_1.Entity)('sales')
], SaleEntity);
var SaleStatus;
(function (SaleStatus) {
    SaleStatus["PENDING"] = "PENDING";
    SaleStatus["COMPLETED"] = "COMPLETED";
    SaleStatus["CANCELLED"] = "CANCELLED";
})(SaleStatus || (exports.SaleStatus = SaleStatus = {}));
//# sourceMappingURL=sale.entity.js.map