import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAll(id: number): Promise<import(".prisma/client").Order[]>;
}
