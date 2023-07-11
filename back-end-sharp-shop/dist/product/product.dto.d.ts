import { Prisma } from '@prisma/client';
export declare class ProductDto implements Prisma.ProductUpdateInput {
    name: string;
    description: string;
    price: number;
    images: string[];
    categoryId: number;
}
