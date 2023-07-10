import { IsEmail, MinLength, IsString } from 'class-validator'

export class authDto {
	@IsEmail()
	email: string

	@MinLength(8, { message: 'Password is too short' })
	@IsString()
	password: string
}
