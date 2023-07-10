import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	Query,
	Put
} from '@nestjs/common'
import { ProductService } from './product.service'
import { GetAllProductDto } from './dto/get-all-product.dto'
import { Auth } from '../auth/decorators/auth.decoraror'
import { ProductDto } from './product.dto'
@Controller('products')
export class ProductController {
	constructor(private productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() queryDto: GetAllProductDto) {
		return await this.productService.getAll(queryDto)
	}

	@Get('similar/:id')
	async getSimilar(@Param('id') id: string) {
		return this.productService.getSimilar(+id)
	}

	@Post()
	@Auth()
	async create() {
		return this.productService.create()
	}

	@Delete('/:id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.productService.delete(+id)
	}

	@Put('/:id')
	@Auth()
	async update(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(+id, dto)
	}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug)
	}

	@Get('/:id')
	async byId(@Param('id') id: string) {
		return this.productService.byId(+id)
	}
	@Get('category/:category')
	async byCategory(@Param('category') category: string) {
		return this.productService.byCategory(category)
	}
}
