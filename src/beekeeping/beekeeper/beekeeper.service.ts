import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BeekeeperRepository } from './beekeeper.repository';
import { Beekeeper } from './interfaces/beekeeper.interface';
import { BeekeeperDto } from './dto/beekeeper.dto';
import { AddressService } from '../address/address.service';
import { Address } from '../address/interfaces/address.interface';
import { AddressDto } from '../address/dto/address.dto';

@Injectable()
export class BeekeeperService {
  constructor(
    private readonly beekeeperRepository: BeekeeperRepository,
    private readonly addressService: AddressService,
  ) {}

  async findAll() {
    try {
      const [rows] = await this.beekeeperRepository.findAll();
      return rows;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<Beekeeper | undefined> {
    try {
      const [rows] = await this.beekeeperRepository.findOne(id);
      if (!rows) {
        return undefined;
      }
      const row = rows[0];
      const address: Address = {
        id: row.address_id,
        street: row.street,
        additional_address: row.additional_address,
        zipcode: row.zipcode,
        city: row.city,
        state: row.state,
        country: row.country,
      };
      return {
        id: row.id,
        firstname: row.firstname,
        lastname: row.lastname,
        siret: row.siret,
        napi: row.napi,
        email: row.email,
        phone: row.phone,
        address: address,
      } as Beekeeper;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(beekeeperDto: BeekeeperDto) {
    try {
      const address: Address = await this.insertAddress(beekeeperDto.address);

      const result = await this.beekeeperRepository.create(beekeeperDto);
      const id = (result as any).insertId;
      return {
        id: id,
        lastname: beekeeperDto.lastname,
        firstname: beekeeperDto.firstname,
        siret: beekeeperDto.siret,
        napi: beekeeperDto.napi,
        email: beekeeperDto.napi,
        phone: beekeeperDto.phone,
        address,
      } as Beekeeper;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(beekeeper: Beekeeper) {
    try {
      await this.beekeeperRepository.update(beekeeper);
      return beekeeper;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const beekeeper = await this.findOne(id);
      const [beekeeperDelete] = await this.beekeeperRepository.delete(id);
      await this.addressService.delete(beekeeper.address.id);
      return beekeeperDelete;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async insertAddress(addressDto: AddressDto) {
    const addressResult = await this.addressService.create(addressDto);
    const id = (addressResult as any).insertId;
    return { id, ...addressDto };
  }
}
