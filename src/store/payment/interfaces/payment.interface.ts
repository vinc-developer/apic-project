import { ClientDto } from '../../client/dto/client.dto';
import { OrderProductsDto } from '../../order/dto/orderProduct.dto';

export interface Payment {
  total_price: number;
  client: ClientDto;
  listProducts: OrderProductsDto[];
}