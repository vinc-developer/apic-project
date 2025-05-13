import { Order } from '../interfaces/order.interface';
import { ClientDto } from '../../client/dto/client.dto';
import { Status } from '../model/status.enum';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductsDto } from './orderProduct.dto';

export class OrderDto implements Order {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Le order_date doit être une date valide.' })
  order_date: Date;

  @IsOptional()
  @IsNumber()
  order_number: number;

  @IsOptional()
  @IsEnum(Status, { message: "Le type n'est pas un enum valide." })
  status: Status;

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
