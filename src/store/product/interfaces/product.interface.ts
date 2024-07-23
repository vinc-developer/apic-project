import { HarvesthoneyDto } from '../../../beekeeping/honey/harvesthoney/dto/harvesthoney.dto';
import { TypeProduct } from '../model/TypeProduct.enum';

export interface Product {
  id: number;
  price: number;
  type: TypeProduct;
  weight: number;
  quantity: number;
  quantity_sale: number;
  lot_number: number;
  DLUO: Date;
  date_packaging: Date;
  harvesthoney: HarvesthoneyDto;
}
