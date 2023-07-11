import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
import { tokenDto } from './dto/token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: authDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
        };
    }>;
    login(dto: authDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import(".prisma/client").User;
    }>;
    getNewTokens(dto: tokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
