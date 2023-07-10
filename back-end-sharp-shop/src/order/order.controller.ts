import {
	Controller,
	Get
} from '@nestjs/common'
import { OrderService } from './order.service'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { Auth } from '../auth/decorators/auth.decoraror'

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') id: number) {
		return this.orderService.getAll(id)
	}
}
