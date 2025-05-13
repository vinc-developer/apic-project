import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';

@Module({
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
