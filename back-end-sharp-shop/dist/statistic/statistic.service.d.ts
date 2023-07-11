import { PrismaService } from '../prisma.service';
export declare class StatisticService {
    private prisma;
    constructor(prisma: PrismaService);
    getStatistic(userId: number): Promise<({
        name: string;
        value: number;
    } | {
        name: string;
        value: Date;
    })[]>;
}
