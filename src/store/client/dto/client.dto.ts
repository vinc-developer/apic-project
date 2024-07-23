import { Client } from '../interfaces/client.interface';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '../../../beekeeping/address/dto/address.dto';

export class ClientDto implements Client {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  firstname: string;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  lastname: string;

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
