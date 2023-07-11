import { StatisticService } from './statistic.service';
export declare class StatisticController {
    private readonly statisticService;
    constructor(statisticService: StatisticService);
    getStatistic(id: number | string): Promise<({
        name: string;
        value: number;
    } | {
        name: string;
        value: Date;
    })[]>;
}
