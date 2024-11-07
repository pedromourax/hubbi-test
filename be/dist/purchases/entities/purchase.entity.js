"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseStatus = exports.Purchase = exports.PurchaseItem = void 0;
class PurchaseItem {
}
exports.PurchaseItem = PurchaseItem;
class Purchase {
}
exports.Purchase = Purchase;
var PurchaseStatus;
(function (PurchaseStatus) {
    PurchaseStatus["PENDING"] = "PENDING";
    PurchaseStatus["COMPLETED"] = "COMPLETED";
    PurchaseStatus["CANCELLED"] = "CANCELLED";
})(PurchaseStatus || (exports.PurchaseStatus = PurchaseStatus = {}));
//# sourceMappingURL=purchase.entity.js.map