import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { Auth } from '../auth/decorators/auth.decoraror'
import { ReviewDto } from './review.dto'
import { CurrentUser } from '../auth/decorators/user.decorator'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.reviewService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post('leave/:id')
	async leaveReview(
		@Param('id') id: string,
		@Body() dto: ReviewDto,
		@CurrentUser('id') userId: number
	) {
		return this.reviewService.leaveReview(+userId, +id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Get('average/:id')
	async getAverageRating(@Param('id') id: string | number) {
		return this.reviewService.getAverageRating(+id)
	}
}
