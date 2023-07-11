import { ReviewService } from './review.service';
import { ReviewDto } from './review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
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
    leaveReview(id: string, dto: ReviewDto, userId: number): Promise<import(".prisma/client").Review>;
    getAverageRating(id: string | number): Promise<{
        rating: number;
    }>;
}
