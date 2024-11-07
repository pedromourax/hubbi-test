"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleStatus = exports.Sale = exports.SaleItem = void 0;
class SaleItem {
}
exports.SaleItem = SaleItem;
class Sale {
}
exports.Sale = Sale;
var SaleStatus;
(function (SaleStatus) {
    SaleStatus["PENDING"] = "PENDING";
    SaleStatus["COMPLETED"] = "COMPLETED";
    SaleStatus["CANCELLED"] = "CANCELLED";
})(SaleStatus || (exports.SaleStatus = SaleStatus = {}));
//# sourceMappingURL=sale.entity.js.map