import { Harvesthoney } from '../interfaces/harvesthoney.interface';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { HoneycropDto } from '../../honeycrop/dto/honeycrop.dto';
import { BeeyardDto } from '../../../beeyard/dto/beeyard.dto';

export class HarvesthoneyByBeeyardDto implements Harvesthoney {
  @IsOptional()
  @IsNumber({}, { message: 'la validation échoué' })
  id: number;

  @IsNotEmpty({ message: 'la validation échoué' })
  @Type(() => Date)
  @IsDate({ message: 'La date de récolte doit être une date valide.' })
  date_harvest: Date;

  @IsNotEmpty({ message: 'la validation échoué' })
  @IsNumber()
  total_honey_kg: number;

  @IsOptional({ message: 'la validation échoué' })
  @IsNumber()
  total_sale_honey_kg: number;

  @IsNotEmpty({ message: 'la validation échoué' })
  @IsNumber()
  lot_number: number;

  @IsNotEmpty({ message: 'la validation échoué' })
  @IsString()
  storage: string;

  @IsOptional({ message: 'la validation échoué' })
  @Type(() => BeeyardDto)
  beeyard: BeeyardDto;

  @IsNotEmpty({ message: 'Les récoltes de miel ne peuvent pas être vides.' })
  @ValidateNested({each: true, message: 'la validation échoué' })
  @Type(() => HoneycropDto)
  honeycrops: HoneycropDto[] = [];
}
