import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { faker } from '@faker-js/faker'
import {
	productReturnObject,
	productReturnObjectFull
} from './return-product.object'
import { ProductDto } from './product.dto'
import { EnumProductSort, GetAllProductDto } from './dto/get-all-product.dto'
import { PaginationService } from '../pagination/pagination.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService
	) {}

	async getAll(dto: GetAllProductDto) {
		const { searchTerm, sort } = dto
		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []
		if (sort === EnumProductSort.LOWEST_PRICE) {
			prismaSort.push({
				price: 'asc'
			})
		} else if (sort === EnumProductSort.HIGHEST_PRICE) {
			prismaSort.push({
				price: 'desc'
			})
		} else if (sort === EnumProductSort.NEWEST) {
			prismaSort.push({
				createdAt: 'desc'
			})
		} else {
			prismaSort.push({
				createdAt: 'asc'
			})
		}

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								name: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							},
							name: {
								contains: searchTerm,
								mode: 'insensitive'
							},
							description: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						}
					]
			  }
			: {}
		const { perPage, skip } = this.paginationService.getPagination(dto)

		const products = await this.prisma.product.findMany({
			where: prismaSearchTermFilter,
			orderBy: prismaSort,
			skip: skip,
			take: perPage,
			select: productReturnObject
		})
		return {
			products,
			length: await this.prisma.product.count({
				where: prismaSearchTermFilter
			})
		}
	}
	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id: id
			},
			select: productReturnObjectFull
		})

		if (!product) {
			throw new Error('Category not found')
		}
		return product
	}

	async getSimilar(id: number) {
		const category = await this.prisma.product.findUnique({
			where: {
				id: id
			},
			select: {
				categoryId: true
			}
		})
		if (!category.categoryId) {
			return new Error('Category not found')
		}
		const similarProducts = await this.prisma.product.findMany({
			where: {
				categoryId: category.categoryId
			},
			select: productReturnObject
		})

		return similarProducts
	}
	async update(id: number, dto: ProductDto) {
		const { name, description, price, images, categoryId } = dto
		return this.prisma.product.update({
			where: {
				id: id
			},
			data: {
				description: description,
				name: name,
				price: price,
				images: images,
				slug: faker.helpers.slugify(name).toLowerCase(),
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async delete(id: number) {
		return this.prisma.product.delete({
			where: {
				id: id
			}
		})
	}

	async create() {
		return this.prisma.product.create({
			data: {
				name: '',
				slug: '',
				description: '',
				price: 0
			}
		})
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug
			},
			select: productReturnObjectFull
		})

		if (!product) {
			throw new NotFoundException('Product not found')
		}
		return product
	}

	async byCategory(category: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: category
				}
			},
			select: productReturnObject
		})
		return products
	}
}
