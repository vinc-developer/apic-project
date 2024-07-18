import { Body, Controller, Get, HttpStatus, Param, Put, Res } from "@nestjs/common";
import { AddressService } from './address.service';
import { Response } from 'express';
import { AddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  /**
   *
   * @param addressDto
   * @param res
   */
  @Put()
  async update(@Body() addressDto: AddressDto, @Res() res: Response) {
    try {
      await this.addressService.update(addressDto);
      res.status(HttpStatus.OK).json(addressDto);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la mise à jour de l'address : ${err.message}`});
    }
  }

  /**
   *
   * @param id
   * @param res
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const addressId = Number(id);
    if (isNaN(addressId)) {
      res.status(HttpStatus.BAD_REQUEST).json({message: 'Identifiant adresse invalide'});
    }

    try {
      const address = await this.addressService.findOne(addressId);
      res.status(HttpStatus.OK).json(address);
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({message: `Erreur dans la récupération de l'adresse : ${err.message}`});
    }
  }
}
