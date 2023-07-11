import { PaginationDto } from './pagination.dto';
export declare class PaginationService {
    getPagination(dto: PaginationDto, defaultPage?: number): {
        perPage: number;
        skip: number;
    };
}
