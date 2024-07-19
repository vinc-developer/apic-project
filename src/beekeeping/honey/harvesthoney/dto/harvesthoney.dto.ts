import { Harvesthoney } from '../interfaces/harvesthoney.interface';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { HoneycropDto } from '../../honeycrop/dto/honeycrop.dto';

export class HarvesthoneyDto implements Harvesthoney {
  @IsOptional()
  @ValidateNested({ message: 'la validation échoué' })
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => Date)
  @IsDate()
  date_harvest: Date;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @IsNumber()
  total_honey_kg: number;

  @IsOptional()
  @ValidateNested({ message: 'la validation échoué' })
  @IsNumber()
  total_sale_honey_kg: number;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => HoneycropDto)
  honeycrops: HoneycropDto[];
}
