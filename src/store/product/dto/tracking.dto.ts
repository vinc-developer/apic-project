import { ProductDto } from './product.dto';
import { HarvesthoneyDto } from '../../../beekeeping/honey/harvesthoney/dto/harvesthoney.dto';
import { HoneycropDto } from '../../../beekeeping/honey/honeycrop/dto/honeycrop.dto';
import { BeehiveDto } from '../../../beekeeping/beehive/dto/beehive.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BeeyardDto } from '../../../beekeeping/beeyard/dto/beeyard.dto';
import { BeekeeperDto } from '../../../beekeeping/beekeeper/dto/beekeeper.dto';

export class TrackingDto {
  @IsNotEmpty({ message: 'La produit ne peut pas être vides.' })
  @ValidateNested({ each: true, message: 'la validation échoué' })
  @Type(() => ProductDto)
  productDto: ProductDto;

  @IsNotEmpty({ message: 'La récolte de miel ne peut pas être vides.' })
  @ValidateNested({ each: true, message: 'la validation échoué' })
  @Type(() => HarvesthoneyDto)
  harvesthoney: HarvesthoneyDto;

  @IsNotEmpty({ message: 'Les récoltes de miel ne peuvent pas être vides.' })
  @ValidateNested({ each: true, message: 'la validation échoué' })
  @Type(() => HoneycropDto)
  honeycrop: HoneycropDto[];

  @IsNotEmpty({ message: 'La ruche ne peut pas être vide.' })
  @Type(() => BeehiveDto)
  beehive: BeehiveDto[];

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => BeeyardDto)
  beeyard: BeeyardDto[];

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => BeekeeperDto)
  beekeeper: BeekeeperDto[];
}
