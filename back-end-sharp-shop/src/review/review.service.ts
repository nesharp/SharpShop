import { Injectable } from '@nestjs/common'
import { returnReviewObject } from './return-review.object'
import { PrismaService } from '../prisma.service'
import { ReviewDto } from './review.dto'
import { faker } from '@faker-js/faker'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}
	async getAverageRating(productId: number) {
		return this.prisma.review
			.aggregate({
				where: { productId: productId },
				_avg: { rating: true }
			})
			.then(data => data._avg)
	
	}

	async leaveReview(userId: number, productId: number, dto: ReviewDto) {
		return this.prisma.review.create({
			data: {
				text: dto.text,
				rating: dto.rating,
				product: {
					connect: {
						id: productId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async getAll() {
		const reviews = await this.prisma.review.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnReviewObject
		})
		return reviews
	}
}
