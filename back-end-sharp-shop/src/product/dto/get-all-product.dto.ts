import { PaginationDto } from '../../pagination/pagination.dto'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export enum EnumProductSort {
	HIGHEST_PRICE = 'hight-price',
	LOWEST_PRICE = 'low-price',
	OLDEST = 'oldest',
	NEWEST = 'newest'
}
export class GetAllProductDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EnumProductSort)
	sort: EnumProductSort

	@IsOptional()
	@IsString()
	searchTerm: string
}
