import { Honeycrop } from '../interfaces/honeycrop.interface';
import { BeehiveDto } from '../../../beehive/dto/beehive.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class HoneycropDto implements Honeycrop {
  @IsOptional()
  @IsNumber({}, { message: 'la validation échoué' })
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  name: string;

  @IsNotEmpty({ message: 'la validation échoué' })
  @IsNumber()
  honey_kg: number;

  @IsNotEmpty({ message: 'la validation échoué' })
  @IsNumber()
  nb_hausses: number;

  @IsNotEmpty({ message: 'La ruche ne peut pas être vide.' })
  @Type(() => BeehiveDto)
  beehive: BeehiveDto;
}
