import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'


@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}
	async getAll(id: number) {
		return this.prisma.order.findMany({
			where: {
				userId: id
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}
}
