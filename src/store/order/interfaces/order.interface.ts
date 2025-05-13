import { Status } from '../model/status.enum';
import { ClientDto } from '../../client/dto/client.dto';

export interface Order {
  id: number;
  order_number: number;
  total_price: number;
  order_date: Date;
  status: Status;
  client: ClientDto;
}
