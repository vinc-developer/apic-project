import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { AddressDto } from './dto/address.dto';
import { Address } from './interfaces/address.interface';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async findOne(id: number): Promise<Address | undefined> {
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
      };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(addressDto: AddressDto) {
    try {
      const result = await this.addressRepository.create(addressDto);
      const id = (result as any).insertId;
      return { id, ...addressDto };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(address: Address) {
    try {
      await this.addressRepository.update(address);
      return address;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const [addressDelete] = await this.addressRepository.delete(id);
      return addressDelete;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
