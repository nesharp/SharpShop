import { PrismaService } from '../prisma.service';
import { authDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { tokenDto } from './dto/token.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: authDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
        };
    }>;
    private issueTokens;
    private returnUserFields;
    login(dto: authDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: User;
    }>;
    getNewTokens(dto: tokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private validateUser;
}
