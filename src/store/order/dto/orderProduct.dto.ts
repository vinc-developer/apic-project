import { ProductDto } from '../../product/dto/product.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderProductsDto {
  @IsNotEmpty({ message: 'la validation échoué' })
  @IsNumber()
  quantity: number;

  @IsNotEmpty({ message: 'Le produit ne peut pas être vides.' })
  @ValidateNested({ each: true, message: 'la validation échoué' })
  @Type(() => ProductDto)
  product: ProductDto;
}
