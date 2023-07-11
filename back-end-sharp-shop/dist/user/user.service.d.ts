import { PrismaService } from 'src/prisma.service';
import { userDto } from './user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    byId(id: number): Promise<import(".prisma/client").User>;
    updateProfile(id: number, dto: userDto): Promise<import(".prisma/client").User>;
}
