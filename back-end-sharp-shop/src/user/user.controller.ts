import { UserService } from './user.service'
import {
	Controller,
	Get,
	HttpCode,
	Patch,
	UsePipes,
	Put,
	Param,
	ValidationPipe,
	Body
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decoraror'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { userDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: string) {
		return await this.userService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(@CurrentUser('id') id: number, @Body() dto: userDto) {
		return await this.userService.updateProfile(id, dto)
	}
}
