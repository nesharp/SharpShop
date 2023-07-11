import { PrismaService } from '../prisma.service';
import { ReviewDto } from './review.dto';
export declare class ReviewService {
    private prisma;
    constructor(prisma: PrismaService);
    getAverageRating(productId: number): Promise<{
        rating: number;
    }>;
    leaveReview(userId: number, productId: number, dto: ReviewDto): Promise<import(".prisma/client").Review>;
    getAll(): Promise<{
        createdAt?: Date;
        updatedAt?: Date;
        id?: number;
        user?: import(".prisma/client").User;
        product?: import(".prisma/client").Product;
        userId?: number;
        rating?: number;
        text?: string;
        productId?: number;
    }[]>;
}
