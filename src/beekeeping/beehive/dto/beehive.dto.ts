import { Beehive } from '../interfaces/beehive.interface';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { BeeyardDto } from '../../beeyard/dto/beeyard.dto';

export class BeehiveDto implements Beehive {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  bee_type: string;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  type_hive: string;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => BeeyardDto)
  beeyard: BeeyardDto;
}
