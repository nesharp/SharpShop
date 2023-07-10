import {
	Injectable,
	BadRequestException,
	UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { authDto } from './dto/auth.dto'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { tokenDto } from './dto/token.dto'
import { verify } from 'argon2'
@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) {}
	//register function
	async register(dto: authDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (oldUser) {
			throw new BadRequestException('User already exists')
		}

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: faker.name.firstName(),
				avatarPath: faker.image.avatar(),
				phone: faker.phone.number('+38(###)###-##-##').toString(),
				password: await hash(dto.password)
			}
		})

		const tokens = await this.issueTokens(user.id)
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}
	//creating tokens
	private async issueTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})
		return { accessToken, refreshToken }
	}
	//returning user fields
	private returnUserFields = (user: User) => {
		return {
			id: user.id,
			email: user.email
		}
	}

	//login function
	async login(dto: authDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokens(user.id)
		return {
			user,
			...tokens
		}
	}
	async getNewTokens(dto: tokenDto) {
		const refreshToken = dto.refreshToken
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid token')
		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id
			}
		})
		const tokens = await this.issueTokens(user.id)
		return {
			...tokens
		}
	}

	private async validateUser(dto: authDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (!user) throw new UnauthorizedException('Invalid email or password')
		const isValid = await verify(user.password, dto.password)
		if (!isValid) throw new UnauthorizedException('Invalid email or password')
		return user
	}
}
