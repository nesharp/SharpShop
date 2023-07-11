import { UserService } from './user.service';
import { userDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(id: string): Promise<import(".prisma/client").User>;
    updateProfile(id: number, dto: userDto): Promise<import(".prisma/client").User>;
}
