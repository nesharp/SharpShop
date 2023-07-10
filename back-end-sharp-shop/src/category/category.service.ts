import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { returnCategoryObject } from './return-category.object'
import { CategoryDto } from './category.dto'
import { faker } from '@faker-js/faker'
@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}
	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id: id
			},
			select: returnCategoryObject
		})

		if (!category) {
			throw new Error('Category not found')
		}
		return category
	}
	async update(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id: id
			},
			data: {
				name: dto.name,
				slug: faker.helpers.slugify(dto.name).toLowerCase()
			}
		})
	}

	async delete(id: number) {
		return this.prisma.category.delete({
			where: {
				id: id
			}
		})
	}

	async create() {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: ''
			}
		})
	}

	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			},
			select: returnCategoryObject
		})

		if (!category) {
			throw new Error('Category not found')
		}
		return category
	}
	async getAll() {
		const category = await this.prisma.category.findMany({
			select: returnCategoryObject
		})
		return category
	}
}
