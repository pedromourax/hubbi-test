export declare class CreatePurchaseItemDto {
    productId: number;
    quantity: number;
    price: number;
}
export declare class CreatePurchaseDto {
    sale: number;
    products: {
        id: number;
    }[];
}
