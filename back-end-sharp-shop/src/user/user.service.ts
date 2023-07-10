import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { usersObject } from './user.object'
import { Prisma } from '@prisma/client'
import { userDto } from './user.dto'
import { hash } from 'argon2'
@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	// get profile
	async byId(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: id
			}
		})

		if (!user) {
			throw new Error('User not found')
		}
		return user
	}
	async updateProfile(id: number, dto: userDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (oldUser && id !== oldUser.id) {
			throw new Error('Email already exists')
		}
		const user = await this.byId(id)
		return this.prisma.user.update({
			where: {
				id: id
			},
			data: {
				email: dto.email,
				name: dto.name,
				avatarPath: dto.avatarPath,
				phone: dto.phone,
				password: dto.password ? await hash(dto.password) : user.password
			}
		})
	}
}
