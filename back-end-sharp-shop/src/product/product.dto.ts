import { ArrayMinSize, IsNumber, IsOptional, IsString } from 'class-validator'
import { Prisma } from '@prisma/client'

export class ProductDto implements Prisma.ProductUpdateInput {
	@IsString()
	name: string

	@IsNumber()
	@IsString()
	@IsOptional()
	description: string

	@IsNumber()
	price: number

	@IsString({ each: true })
	@ArrayMinSize(1)
	@IsOptional()
	images: string[]

	@IsNumber()
	categoryId: number
}
