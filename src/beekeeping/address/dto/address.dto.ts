import { IsOptional, IsString } from 'class-validator';

export class AddressDto {
  @IsString({ message: 'la validation échoué' })
  street: string;

  @IsOptional()
  @IsString({ message: 'la validation a échoué' })
  additional_address: string;

  @IsString({ message: 'la validation échoué' })
  zipcode: string;

  @IsString({ message: 'la validation échoué' })
  city: string;

  @IsOptional()
  @IsString({ message: 'la validation a échoué' })
  state: string;

  @IsOptional()
  @IsString({ message: 'la validation a échoué' })
  country: string;
}
