import { Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ValidationPipe, Body } from '@nestjs/common'
import { authDto } from './dto/auth.dto'
import { tokenDto } from './dto/token.dto'
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	// register
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: authDto) {
		return await this.authService.register(dto)
	}
	// login
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() dto: authDto) {
		return await this.authService.login(dto)
	}

	// refresh token
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('login/access-token')
	async getNewTokens(@Body() dto: tokenDto) {
		return await this.authService.getNewTokens(dto)
	}
}
