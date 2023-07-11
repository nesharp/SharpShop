import { PrismaService } from 'src/prisma.service';
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    createPayment(): Promise<number>;
}
