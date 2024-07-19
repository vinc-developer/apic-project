import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class RelHarvestHoneycropDto {
  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @IsNumber()
  idHarvestHoney: number;

  @IsNotEmpty()
  @ValidateNested({ message: 'la validation échoué' })
  @IsNumber()
  idHoneycrop: number;
}
