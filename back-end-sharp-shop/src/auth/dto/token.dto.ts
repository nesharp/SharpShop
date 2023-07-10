import { IsString } from 'class-validator'

export class tokenDto {
	@IsString()
	refreshToken: string
}
