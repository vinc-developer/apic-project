import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { AddressDto } from '../../address/dto/address.dto';

export class BeekeeperDto {
  @IsString({ message: 'la validation échoué' })
  lastname: string;

  @IsString({ message: 'la validation échoué' })
  firstname: string;

  @IsOptional()
  @IsString({ message: 'la validation a échoué' })
  siret: string;

  @IsString({ message: 'la validation échoué' })
  napi: string;

  @IsEmail({}, { message: 'la validation échoué' })
  email: string;

  @IsOptional()
  @IsPhoneNumber('FR', { message: 'la validation a échoué' })
  phone?: string;

  address: AddressDto;
}
