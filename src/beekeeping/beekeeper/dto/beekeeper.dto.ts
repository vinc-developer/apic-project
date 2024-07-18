import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateNested } from "class-validator";
import { AddressDto } from '../../address/dto/address.dto';
import { Type } from 'class-transformer';
import { Beekeeper } from '../interfaces/beekeeper.interface';

export class BeekeeperDto implements Beekeeper {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  firstname: string;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  lastname: string;

  @IsOptional()
  @IsString({ message: 'la validation a échoué' })
  siret: string;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  napi: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'la validation échoué' })
  email: string;

  @IsOptional()
  @IsPhoneNumber('FR', { message: 'la validation a échoué' })
  phone: string;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @Type(() => AddressDto)
  address: AddressDto;
}
