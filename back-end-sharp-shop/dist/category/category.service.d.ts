import { PrismaService } from '../prisma.service';
import { CategoryDto } from './category.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    byId(id: number): Promise<{
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        id?: number;
        slug?: string;
        products?: import(".prisma/client").Product[];
        _count?: import(".prisma/client").Prisma.CategoryCountOutputType;
    }>;
    update(id: number, dto: CategoryDto): Promise<import(".prisma/client").Category>;
    delete(id: number): Promise<import(".prisma/client").Category>;
    create(): Promise<import(".prisma/client").Category>;
    bySlug(slug: string): Promise<{
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        id?: number;
        slug?: string;
        products?: import(".prisma/client").Product[];
        _count?: import(".prisma/client").Prisma.CategoryCountOutputType;
    }>;
    getAll(): Promise<{
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        id?: number;
        slug?: string;
        products?: import(".prisma/client").Product[];
        _count?: import(".prisma/client").Prisma.CategoryCountOutputType;
    }[]>;
}
