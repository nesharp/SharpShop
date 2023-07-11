import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate({ id }: Pick<User, 'id'>): Promise<User>;
}
export {};
