import { PrismaService } from '../prisma.service';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(id: number): Promise<import(".prisma/client").Order[]>;
}
