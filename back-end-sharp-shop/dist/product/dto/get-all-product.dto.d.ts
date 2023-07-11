import { PaginationDto } from '../../pagination/pagination.dto';
export declare enum EnumProductSort {
    HIGHEST_PRICE = "hight-price",
    LOWEST_PRICE = "low-price",
    OLDEST = "oldest",
    NEWEST = "newest"
}
export declare class GetAllProductDto extends PaginationDto {
    sort: EnumProductSort;
    searchTerm: string;
}
