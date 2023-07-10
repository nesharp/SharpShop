import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Put
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { Auth } from '../auth/decorators/auth.decoraror'
import { CategoryDto } from './category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	// get all
	@Get()
	async getAll() {
		return await this.categoryService.getAll()
	}
	// 	update
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Body() dto: CategoryDto, @Param('id') id: string| number) {
		return await this.categoryService.update(+id, dto)
	}
	// create
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create() {
		return await this.categoryService.create()
	}
	// delete
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string | number) {
		return await this.categoryService.delete(+id)
	}

	// get by id
	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string | number) {
		return await this.categoryService.byId(+id)
	}
	// 	get by slug
	@Get('slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return await this.categoryService.bySlug(slug)
	}
}
