import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Address } from '../interfaces/address.interface';

export class AddressDto implements Address {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  street: string;

  @IsOptional()
  @IsString({ message: 'la validation a échoué' })
  additional_address: string;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  zipcode: string;

  @IsNotEmpty()
  @IsString({ message: 'la validation échoué' })
  city: string;

  @IsOptional()
  @IsString({ message: 'la validation a échoué' })
  state: string;

  @IsOptional()
  @IsString({ message: 'la validation a échoué' })
  country: string;
}
