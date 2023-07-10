import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello Anonimus!'
	}
	getHelloByName(name): string {
		return `Hello ${name}!`
	}
}
