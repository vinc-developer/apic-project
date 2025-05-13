import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { ClientDto } from '../../client/dto/client.dto';
import { OrderProductsDto } from '../../order/dto/orderProduct.dto';
import { Payment } from '../interfaces/payment.interface';

export class PaymentDto implements Payment {
  @IsOptional()
  @IsNumber()
  total_price: number;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => ClientDto)
  client: ClientDto;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => OrderProductsDto)
  listProducts: OrderProductsDto[];
}
