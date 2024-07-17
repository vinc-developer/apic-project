import { Body, Controller, HttpStatus, Put, Res } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './interfaces/address.interface';
import { Response } from 'express';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Put()
  async update(@Body() address: Address, @Res() res: Response) {
    try {
      return await this.addressService.update(address);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la mise à jour de l'address : ${err.message}`});
    }
  }
}
