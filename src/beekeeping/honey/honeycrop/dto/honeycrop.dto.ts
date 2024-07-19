import { Honeycrop } from '../interfaces/honeycrop.interface';
import { BeehiveDto } from '../../../beehive/dto/beehive.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class HoneycropDto implements Honeycrop {
  @IsOptional()
  @ValidateNested({ message: 'la validation échoué' })
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  name: string;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @IsNumber()
  honey_kg: number;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => BeehiveDto)
  beehive: BeehiveDto;
}
