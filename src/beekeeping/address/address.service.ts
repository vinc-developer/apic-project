import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  /**
   * Création d'une adresse
   * @param addressDto
   */
  async create(addressDto: AddressDto) {
    try {
      const [result] = await this.addressRepository.create(addressDto);
      const id = (result as any).insertId;
      if (!id) {
        throw new HttpException(
          `Erreur dans la création de l'adresse`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return { id, ...addressDto };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Mise à jour d'une adresse
   * @param addressDto
   */
  async update(addressDto: AddressDto) {
    try {
      await this.addressRepository.update(addressDto);
      return addressDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Suppression d'un adresse
   * @param id
   */
  async delete(id: number) {
    try {
      const [addressDelete] = await this.addressRepository.delete(id);
      return addressDelete;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Récupération d'une adresse
   * @param id
   */
  async findOne(id: number) {
    try {
      const [rows] = await this.addressRepository.findOne(id);
      if (!rows) {
        return undefined;
      }
      const row = rows[0];
      return {
        id: row.id,
        street: row.street,
        additional_address: row.additional_address,
        zipcode: row.zipcode,
        city: row.city,
        state: row.state,
        country: row.country,
      } as AddressDto;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
