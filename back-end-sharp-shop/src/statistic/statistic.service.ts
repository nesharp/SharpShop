import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class StatisticService {
	constructor(private prisma: PrismaService) {}
	async getStatistic(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				orders: {
					select: {
						items: true
					}
				},
				reviews: true
			}
		})
		const orders = await this.prisma.order.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			where: { userId }
		})
		return [
			{
				name: 'Orders',
				value: user.orders.length
			},
			{
				name: 'Reviews',
				value: user.reviews.length
			},
			{
				name: 'Totals amount',
				value: user.orders.reduce((acc, order) => {
					return (
						acc +
						order.items.reduce((acc, item) => {
							return acc + item.price
						}, 0)
					)
				}, 0)
			},
			{
				name: 'Last order date',
				value: orders[0].createdAt
			}
		]
	}
}
