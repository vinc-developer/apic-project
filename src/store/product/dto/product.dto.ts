import { Product } from '../interfaces/product.interface';
import { HarvesthoneyDto } from '../../../beekeeping/honey/harvesthoney/dto/harvesthoney.dto';
import { TypeProduct } from '../model/TypeProduct.enum';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto implements Product {
  @IsOptional()
  @IsNumber({}, { message: 'la validation échoué' })
  id: number;

  @IsNotEmpty({ message: 'la validation échoué' })
  @IsNumber()
  price: number;

  @IsNotEmpty({ message: 'la validation échoué.' })
  @IsEnum(TypeProduct, { message: "Le type n'est pas un enum valide." })
  type: TypeProduct;

  @IsNotEmpty({ message: 'la validation échoué' })
  @IsNumber()
  weight: number;

  @IsNotEmpty({ message: 'la validation échoué' })
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber({}, { message: 'la validation échoué' })
  quantity_sale: number;

  @IsNotEmpty({ message: 'la validation échoué' })
  @IsNumber()
  lot_number: number;

  @IsNotEmpty({ message: 'la validation échoué' })
  @Type(() => Date)
  @IsDate({ message: 'La DLUO doit être une date valide.' })
  DLUO: Date;

  @IsNotEmpty({ message: 'la validation échoué' })
  @Type(() => Date)
  @IsDate({ message: 'La date de conditionnement doit être une date valide.' })
  date_packaging: Date;

  @IsNotEmpty({ message: 'La récolte de miel ne peut pas être vides.' })
  @ValidateNested({ each: true, message: 'la validation échoué' })
  @Type(() => HarvesthoneyDto)
  harvesthoney: HarvesthoneyDto;
}
