import { Body, Controller, Get } from '@nestjs/common'
import { StatisticService } from './statistic.service'

@Controller('statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) { }
	@Get()
	async getStatistic(@Body() id: number | string) {
		return await this.statisticService.getStatistic( +id)
	}
}
