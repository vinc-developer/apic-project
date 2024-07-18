import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { AddressDto } from '../../address/dto/address.dto';
import { BeekeeperDto } from '../../beekeeper/dto/beekeeper.dto';
import { Beeyard } from '../interfaces/beeyard.interface';

export class BeeyardDto implements Beeyard {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  environment: string;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  name: string;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => BeekeeperDto)
  beekeeper: BeekeeperDto;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => AddressDto)
  address: AddressDto;
}
